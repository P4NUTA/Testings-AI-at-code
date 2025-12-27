# Number Guessing Bot

A Telegram bot that plays a number-guessing game with users.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather) on Telegram and get your token

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your token:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

4. Run the bot:
   ```bash
   npm start
   ```

## Commands

- `/start` - Start the bot and begin a new game
- `/newgame` - Start a new game with the current range
- `/range <min> <max>` - Set a custom range and start a new game (e.g., `/range 1 1000`)
- `/help` - Show help message

## How to Play

1. The bot picks a random number in a range (default 1-100)
2. Send a number to guess
3. The bot tells you if the answer is "higher" or "lower"
4. Keep guessing until you find the number
5. After winning, you'll see your attempt count
