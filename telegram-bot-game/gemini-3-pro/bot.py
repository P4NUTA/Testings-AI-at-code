import logging
import random
import os
import sys
from typing import Dict, Any

from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    MessageHandler,
    filters,
)

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Game state storage: chat_id -> game_data
# game_data structure:
# {
#   'target': int,
#   'attempts': int,
#   'min': int,
#   'max': int,
#   'active': bool
# }
games: Dict[int, Dict[str, Any]] = {}

DEFAULT_MIN = 1
DEFAULT_MAX = 100

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Sends a welcome message and starts a game."""
    user_name = update.effective_user.first_name
    await update.message.reply_text(
        f"Hello {user_name}! Welcome to the Number Guessing Game.\n"
        f"I'm thinking of a number between {DEFAULT_MIN} and {DEFAULT_MAX}.\n"
        "Type /newgame to start or /help for more info."
    )
    # Automatically start a game with default settings if not exists
    await start_new_game(update, context)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Displays help information."""
    help_text = (
        "🎮 *Number Guessing Game Help* 🎮\n\n"
        "/start - Welcome message and start default game\n"
        "/newgame - Start a new game with current range\n"
        "/range <min> <max> - Set a new custom range (e.g., /range 1 500)\n"
        "/help - Show this message\n\n"
        "Just type a number to make a guess!"
    )
    await update.message.reply_text(help_text, parse_mode='Markdown')

async def set_range(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Sets a custom range for the game."""
    chat_id = update.effective_chat.id
    args = context.args

    if len(args) != 2:
        await update.message.reply_text("Usage: /range <min> <max> (e.g., /range 1 1000)")
        return

    try:
        min_val = int(args[0])
        max_val = int(args[1])

        if min_val >= max_val:
            await update.message.reply_text("Invalid range: Minimum must be less than Maximum.")
            return

        # Initialize or update state preferences
        if chat_id not in games:
            games[chat_id] = {}
        
        games[chat_id]['min'] = min_val
        games[chat_id]['max'] = max_val
        
        # Start a new game with these settings immediately
        await start_new_game(update, context)

    except ValueError:
        await update.message.reply_text("Please provide valid integers for the range.")

async def start_new_game(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Initializes a new game state."""
    chat_id = update.effective_chat.id
    
    # Get user preferences or defaults
    min_val = games.get(chat_id, {}).get('min', DEFAULT_MIN)
    max_val = games.get(chat_id, {}).get('max', DEFAULT_MAX)

    target = random.randint(min_val, max_val)
    
    games[chat_id] = {
        'target': target,
        'attempts': 0,
        'min': min_val,
        'max': max_val,
        'active': True
    }

    await update.message.reply_text(
        f"🎲 New game started! Guess a number between {min_val} and {max_val}."
    )

async def handle_guess(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles text input as a guess."""
    chat_id = update.effective_chat.id
    game = games.get(chat_id)

    if not game or not game.get('active'):
        await update.message.reply_text("No active game. Type /newgame to start one!")
        return

    user_text = update.message.text.strip()

    # Handle non-integer input
    if not user_text.lstrip('-').isdigit():
        await update.message.reply_text("That's not a valid number. Please enter an integer.")
        return

    guess = int(user_text)
    game['attempts'] += 1
    
    if guess < game['target']:
        await update.message.reply_text("🔼 Higher!")
    elif guess > game['target']:
        await update.message.reply_text("🔽 Lower!")
    else:
        # Correct guess
        attempts = game['attempts']
        game['active'] = False
        await update.message.reply_text(
            f"🎉 Correct! The number was {game['target']}.\n"
            f"You found it in {attempts} attempt{'s' if attempts != 1 else ''}.\n\n"
            "Type /newgame to play again!"
        )

if __name__ == '__main__':
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        print("Error: TELEGRAM_BOT_TOKEN environment variable not set.")
        sys.exit(1)

    application = ApplicationBuilder().token(token).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("newgame", start_new_game))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("range", set_range))
    
    # Filter for text messages that are not commands
    application.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_guess))

    print("Bot is running...")
    application.run_polling()
