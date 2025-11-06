"""Telegram number guessing bot."""

from __future__ import annotations

import logging
import os
import random
import sys
from dataclasses import dataclass
from typing import Dict, Tuple

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)


logger = logging.getLogger(__name__)


@dataclass
class GameState:
    """In-memory state for a single chat/user pair."""

    lower: int = 1
    upper: int = 100
    target: int = 0
    attempts: int = 0
    active: bool = False


def _state_key(chat_id: int | None, user_id: int | None) -> Tuple[int, int]:
    if chat_id is None or user_id is None:
        raise ValueError("Both chat_id and user_id must be available")
    return chat_id, user_id


def get_game_state(update: Update, context: ContextTypes.DEFAULT_TYPE) -> GameState:
    key = _state_key(update.effective_chat.id, update.effective_user.id)
    store: Dict[Tuple[int, int], GameState] = context.application.bot_data.setdefault(
        "game_states", {}
    )
    if key not in store:
        store[key] = GameState()
    return store[key]


def start_new_round(state: GameState, lower: int | None = None, upper: int | None = None) -> None:
    if lower is not None and upper is not None:
        state.lower, state.upper = lower, upper
    state.target = random.randint(state.lower, state.upper)
    state.attempts = 0
    state.active = True
    logger.debug("Started new round with target=%s", state.target)


def format_range(state: GameState) -> str:
    return f"between {state.lower} and {state.upper}"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    state = get_game_state(update, context)
    start_new_round(state)
    await update.message.reply_text(
        "Welcome to the number guessing game!\n"
        f"I'm thinking of a number {format_range(state)}."
        "\nSend guesses as plain numbers, or use /range to change the limits."
    )


async def new_game(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    state = get_game_state(update, context)
    start_new_round(state)
    await update.message.reply_text(
        f"New game started! Guess the number {format_range(state)}."
    )


async def set_range(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) != 2:
        await update.message.reply_text("Usage: /range <min> <max>")
        return
    try:
        lower = int(context.args[0])
        upper = int(context.args[1])
    except ValueError:
        await update.message.reply_text("Please supply two whole numbers, e.g. /range 1 500")
        return
    if lower >= upper:
        await update.message.reply_text("The first number must be smaller than the second.")
        return
    state = get_game_state(update, context)
    start_new_round(state, lower, upper)
    await update.message.reply_text(
        f"Range updated to {lower}-{upper}. I'm thinking of a new number!"
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Commands:\n"
        "/start - start playing\n"
        "/newgame - restart with the current range\n"
        "/range <min> <max> - set a new range and restart\n"
        "/help - show this message\n\n"
        "Send a number at any time to make a guess."
    )


async def handle_guess(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.text:
        return
    state = get_game_state(update, context)
    text = update.message.text.strip()
    try:
        guess = int(text)
    except ValueError:
        await update.message.reply_text("I didn't understand that number. Try again or use /help.")
        return

    if not state.active:
        await update.message.reply_text(
            "You're not currently in a game. Use /newgame to start again."
        )
        return

    if guess < state.lower or guess > state.upper:
        await update.message.reply_text(
            f"Please guess a number {format_range(state)}."
        )
        return

    state.attempts += 1

    if guess < state.target:
        await update.message.reply_text("Higher!")
    elif guess > state.target:
        await update.message.reply_text("Lower!")
    else:
        state.active = False
        await update.message.reply_text(
            f"Correct! The number was {state.target}. "
            f"You needed {state.attempts} attempts."
            "\nUse /newgame to play again or /range to change the limits."
        )


def main() -> None:
    logging.basicConfig(
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
        level=logging.INFO,
    )

    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        logger.error("Missing TELEGRAM_BOT_TOKEN environment variable")
        sys.exit(1)

    application = Application.builder().token(token).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("newgame", new_game))
    application.add_handler(CommandHandler("range", set_range))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_guess))

    logger.info("Bot started")
    application.run_polling()


if __name__ == "__main__":
    main()
