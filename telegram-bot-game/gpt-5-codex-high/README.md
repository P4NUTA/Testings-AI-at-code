# Telegram Number Guessing Bot

This project is a simple Telegram bot that runs a number guessing game for every chat/user. The bot keeps per-user game state so multiple conversations can play independently.

## Features

- `/start` – greet and begin a game in the default range (1–100).
- `/newgame` – restart with the current range.
- `/range <min> <max>` – adjust the guessing range and start a fresh game.
- `/help` – list available commands.
- Free-form numeric messages are treated as guesses; the bot responds with **higher/lower** hints until the user wins and sees their attempt count.

## Setup

1. Ensure Python 3.10+ is installed.
2. Install dependencies:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. Create a Telegram bot via [@BotFather](https://t.me/BotFather) and copy the token.
4. Export the token before running the bot:

   ```bash
   export TELEGRAM_BOT_TOKEN=your_token_here
   ```

## Running

```bash
python bot.py
```

The bot uses long polling by default. Deployments to hosting services can use the same entry point; just ensure the `TELEGRAM_BOT_TOKEN` environment variable is available.
