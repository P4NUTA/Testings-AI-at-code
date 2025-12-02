import logging
import os
import random
from dataclasses import dataclass, field
from typing import Optional

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

DEFAULT_LOW = 1
DEFAULT_HIGH = 100


@dataclass
class GameState:
    low: int
    high: int
    target: int = field(init=False)
    attempts: int = 0
    active: bool = True

    def __post_init__(self) -> None:
        self.target = random.randint(self.low, self.high)


def start_new_game(context: ContextTypes.DEFAULT_TYPE, low: int, high: int) -> GameState:
    game = GameState(low=low, high=high)
    context.chat_data["game"] = game
    return game


def get_game(context: ContextTypes.DEFAULT_TYPE) -> Optional[GameState]:
    game = context.chat_data.get("game")
    if isinstance(game, GameState):
        return game
    return None


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    game = start_new_game(context, DEFAULT_LOW, DEFAULT_HIGH)
    await update.message.reply_text(
        (
            "Welcome to Number Guess! I picked a number between "
            f"{game.low} and {game.high}. Send a number and I will reply "
            "with higher or lower.\n\n"
            "Commands:\n"
            "- /newgame to restart with the same range\n"
            "- /range <low> <high> to change the range\n"
            "- /help to see this message again"
        )
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    game = get_game(context)
    range_info = (
        f"{game.low} to {game.high}" if game else f"{DEFAULT_LOW} to {DEFAULT_HIGH}"
    )
    await update.message.reply_text(
        (
            "Guess the secret number and I will tell you if you need to go higher "
            "or lower. Default range is "
            f"{range_info}.\n\n"
            "Commands:\n"
            "- /start to begin a new game\n"
            "- /newgame to restart with the current range\n"
            "- /range <low> <high> to set a new range and start over\n"
            "- /help to show this help text"
        )
    )


async def new_game(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    existing = get_game(context)
    low = existing.low if existing else DEFAULT_LOW
    high = existing.high if existing else DEFAULT_HIGH
    game = start_new_game(context, low, high)
    await update.message.reply_text(
        f"New game started! I'm thinking of a number between {game.low} and {game.high}."
    )


async def set_range(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) != 2:
        await update.message.reply_text("Usage: /range <low> <high>")
        return

    try:
        low = int(context.args[0])
        high = int(context.args[1])
    except ValueError:
        await update.message.reply_text("Please provide two whole numbers, like: /range 1 1000")
        return

    if low >= high:
        await update.message.reply_text("Low value must be smaller than high value.")
        return

    game = start_new_game(context, low, high)
    await update.message.reply_text(
        f"Range updated to {game.low} to {game.high}. New game started!"
    )


async def handle_guess(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (update.message.text or "").strip()

    try:
        guess = int(text)
    except ValueError:
        await update.message.reply_text(
            "I did not understand that. Please send a whole number or use a command like /help."
        )
        return

    game = get_game(context)
    if not game:
        await update.message.reply_text("No active game yet. Send /start to begin.")
        return

    if not game.active:
        await update.message.reply_text(
            "You already finished that game. Use /newgame to play again or /range <low> <high> to change the range."
        )
        return

    if guess < game.low or guess > game.high:
        await update.message.reply_text(
            f"Please guess within the range {game.low} to {game.high}."
        )
        return

    game.attempts += 1

    if guess < game.target:
        await update.message.reply_text(f"Higher! Attempts so far: {game.attempts}.")
    elif guess > game.target:
        await update.message.reply_text(f"Lower! Attempts so far: {game.attempts}.")
    else:
        game.active = False
        await update.message.reply_text(
            (
                f"Correct! The number was {game.target}. "
                f"You got it in {game.attempts} attempts.\n"
                "Use /newgame to play again or /range <low> <high> to change the range."
            )
        )


def main() -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError("Set the TELEGRAM_BOT_TOKEN environment variable.")

    application: Application = Application.builder().token(token).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("newgame", new_game))
    application.add_handler(CommandHandler("range", set_range))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_guess))

    logger.info("Bot starting...")
    application.run_polling()


if __name__ == "__main__":
    main()
