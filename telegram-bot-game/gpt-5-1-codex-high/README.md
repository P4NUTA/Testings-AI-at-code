# Telegram Number Guess Bot

Simple Telegram bot that plays a number guessing game with each user. The bot picks a random number in a range (default 1-100), replies "higher" or "lower" to guesses, and tracks game state per chat.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Set your bot token (create a bot with BotFather if needed):
   ```bash
   export TELEGRAM_BOT_TOKEN=<your_bot_token>
   ```
3. Run the bot:
   ```bash
   python bot.py
   ```

## Commands

- `/start` — start a game with the default range (1-100) and show instructions.
- `/newgame` — start a new game using the current range.
- `/range <low> <high>` — set a new range and start a fresh game (example: `/range 1 1000`).
- `/help` — show help text.

Send a number at any time to guess. After you win, the bot reports attempts and invites you to start a new game or change the range. Invalid inputs and out-of-range guesses are handled gracefully.
