# Telegram Number Guessing Game Bot

A fun Telegram bot that plays a number-guessing game with users. The bot picks a random number and gives higher/lower hints until you guess correctly!

## Features

- 🎮 Interactive number-guessing game
- 📊 Tracks attempts per game
- 🎯 Configurable number ranges (default: 1-100)
- 👥 Per-user game state management
- 🛡️ Input validation and error handling
- 📝 Easy-to-use commands

## Setup

### 1. Create a Telegram Bot

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow the instructions
3. Save the bot token

### 2. Configure the Bot

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your bot token:
   ```
   BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Bot

```bash
npm start
```

## Usage

### Commands

- `/start` - Start the bot and see welcome message
- `/newgame` - Start a new game
- `/range <min> <max>` - Set the number range (e.g., `/range 1 1000`)
- `/help` - Show help information

### How to Play

1. Start a new game with `/newgame`
2. The bot will pick a random number in the current range
3. Send your guess as a regular message
4. The bot will respond with "📈 Higher!" or "📉 Lower!"
5. Keep guessing until you get it right!
6. After winning, you'll see your attempt count
7. Type `/newgame` to play again or `/range` to change difficulty

## Example

```
You: /newgame
Bot: 🎮 New game started!
     I'm thinking of a number between 1 and 100.
     Try to guess it!

You: 50
Bot: 📈 Higher!

You: 75
Bot: 📉 Lower!

You: 62
Bot: 📈 Higher!

You: 68
Bot: 🎉 Correct! The number was 68.
     You guessed it in 4 attempts!
     Type /newgame to play again or /range to change the range.
```

## Game State

The bot maintains a separate game state for each chat, so multiple people can play independently in the same group!

## Deployment

For production deployment, consider:
- Using a process manager like PM2
- Setting up a webhook instead of long polling
- Using a persistent database instead of in-memory storage
- Adding rate limiting to prevent spam

## License

MIT
