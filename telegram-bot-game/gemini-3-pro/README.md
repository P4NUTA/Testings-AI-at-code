# Telegram Number Guessing Bot

A simple Telegram bot where users guess a random number.

## Features

- **Higher/Lower Feedback**: The bot guides you to the correct number.
- **Custom Ranges**: Use `/range 1 1000` to change difficulty.
- **Attempts Tracker**: Tells you how many tries it took to win.
- **Multi-user Support**: Maintains separate game states for each chat.

## Prerequisites

- Python 3.8+
- A Telegram Bot Token (Get one from [@BotFather](https://t.me/BotFather))

## Installation

1.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Bot

1.  **Export your Token:**
    Replace `YOUR_TOKEN_HERE` with the token you got from BotFather.

    *Linux/macOS:*
    ```bash
    export TELEGRAM_BOT_TOKEN="YOUR_TOKEN_HERE"
    ```

    *Windows (PowerShell):*
    ```powershell
    $env:TELEGRAM_BOT_TOKEN="YOUR_TOKEN_HERE"
    ```

2.  **Start the Bot:**
    ```bash
    python bot.py
    ```

3.  **Play:**
    Open your bot in Telegram and click **Start**.

## Commands

- `/start` - Initialize the bot.
- `/newgame` - Start a fresh round.
- `/range <min> <max>` - Set custom bounds (e.g., `/range 1 500`).
- `/help` - Show instructions.
