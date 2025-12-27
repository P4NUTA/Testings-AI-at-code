import logging
import os
import random
from dataclasses import dataclass

from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters

DEFAULT_MIN = 1
DEFAULT_MAX = 100


@dataclass
class GameState:
    min_value: int
    max_value: int
    target: int
    attempts: int
    active: bool


GAMES: dict[tuple[int, int], GameState] = {}


def _game_key(update: Update) -> tuple[int, int]:
    chat_id = update.effective_chat.id if update.effective_chat else 0
    user_id = update.effective_user.id if update.effective_user else 0
    return chat_id, user_id


def _create_game(min_value: int, max_value: int) -> GameState:
    return GameState(
        min_value=min_value,
        max_value=max_value,
        target=random.randint(min_value, max_value),
        attempts=0,
        active=True,
    )


def _ensure_game(key: tuple[int, int]) -> GameState:
    if key not in GAMES:
        GAMES[key] = _create_game(DEFAULT_MIN, DEFAULT_MAX)
    return GAMES[key]


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    key = _game_key(update)
    GAMES[key] = _create_game(DEFAULT_MIN, DEFAULT_MAX)
    await update.message.reply_text(
        "Welcome to Number Guess!\n"
        "I'm thinking of a number between 1 and 100. Send a guess and I'll say higher or lower.\n"
        "Commands: /newgame, /range <min> <max>, /help"
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Number Guess commands:\n"
        "/start - start a new game in the default range (1-100)\n"
        "/newgame - start a new game with the current range\n"
        "/range <min> <max> - set a new range and start a game\n"
        "/help - show this help\n"
        "Send any number to make a guess."
    )


async def newgame(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    key = _game_key(update)
    if key in GAMES:
        current = GAMES[key]
        GAMES[key] = _create_game(current.min_value, current.max_value)
    else:
        GAMES[key] = _create_game(DEFAULT_MIN, DEFAULT_MAX)
    game = GAMES[key]
    await update.message.reply_text(
        f"New game started. Guess a number between {game.min_value} and {game.max_value}."
    )


async def set_range(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) != 2:
        await update.message.reply_text("Usage: /range <min> <max>")
        return
    try:
        min_value = int(context.args[0])
        max_value = int(context.args[1])
    except ValueError:
        await update.message.reply_text("Range values must be whole numbers.")
        return
    if min_value >= max_value:
        await update.message.reply_text("Range must have min < max.")
        return
    key = _game_key(update)
    GAMES[key] = _create_game(min_value, max_value)
    await update.message.reply_text(
        f"Range set to {min_value}-{max_value}. New game started!"
    )


async def handle_guess(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.text:
        return
    key = _game_key(update)
    game = _ensure_game(key)
    if not game.active:
        await update.message.reply_text(
            "That game is over. Start a new one with /newgame or set a range with /range."
        )
        return
    text = update.message.text.strip()
    try:
        guess = int(text)
    except ValueError:
        await update.message.reply_text("Please send a whole number.")
        return
    if guess < game.min_value or guess > game.max_value:
        await update.message.reply_text(
            f"Your guess is out of range. Try {game.min_value}-{game.max_value}."
        )
        return
    game.attempts += 1
    if guess < game.target:
        await update.message.reply_text("Higher.")
    elif guess > game.target:
        await update.message.reply_text("Lower.")
    else:
        game.active = False
        await update.message.reply_text(
            f"Correct! You got it in {game.attempts} attempts.\n"
            "Want to play again? Use /newgame or set a new /range."
        )


def main() -> None:
    logging.basicConfig(
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
        level=logging.INFO,
    )
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is not set.")
    app = ApplicationBuilder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("newgame", newgame))
    app.add_handler(CommandHandler("range", set_range))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_guess))
    app.run_polling()


if __name__ == "__main__":
    main()
