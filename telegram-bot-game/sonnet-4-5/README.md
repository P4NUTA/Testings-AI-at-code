# Telegram Number Guessing Game Bot

A fun Telegram bot that plays a number-guessing game with users. The bot picks a random number in a configurable range, and users try to guess it with helpful "higher" or "lower" hints.

## Features

- Random number generation in configurable ranges (default: 1-100)
- Per-chat game state management
- Attempt tracking and statistics
- Helpful hints (higher/lower) for each guess
- Input validation and error handling
- Custom range support (e.g., 1-1000)

## Prerequisites

- Node.js (v14 or higher)
- A Telegram Bot Token from [@BotFather](https://t.me/botfather)

## Setup

1. **Clone or navigate to this directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a bot on Telegram**
   - Open Telegram and search for [@BotFather](https://t.me/botfather)
   - Send `/newbot` command
   - Follow the instructions to create your bot
   - Copy the bot token you receive

4. **Configure environment variables**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your bot token:
     ```
     TELEGRAM_BOT_TOKEN=your_bot_token_here
     ```

5. **Run the bot**
   ```bash
   npm start
   ```

## Usage

Once the bot is running, open it in Telegram and use these commands:

### Commands

- `/start` - Start a new game with default range (1-100)
- `/newgame` - Start a new game with the same range as before
- `/range [min] [max]` - Set a custom range and start a new game
  - Example: `/range 1 1000`
- `/help` - Show help message with all commands

### How to Play

1. Start a game with `/start` or `/newgame`
2. The bot will pick a random number in the specified range
3. Send your guess as a simple number (e.g., `50`)
4. The bot will respond with:
   - "Too low!" if your guess is below the target
   - "Too high!" if your guess is above the target
   - Congratulations message if you guess correctly
5. After winning, you can see how many attempts it took
6. Start a new game with `/newgame`

### Example Game Session

```
You: /start
Bot: Welcome to the Number Guessing Game!
     I've picked a number between 1 and 100.
     Try to guess it!

You: 50
Bot: Too high! Try a lower number.
     Attempts: 1

You: 25
Bot: Too low! Try a higher number.
     Attempts: 2

You: 37
Bot: Congratulations! You guessed it!
     The number was 37.
     You took 3 attempts to win.

     Would you like to play again? Use /newgame to start a new game!
```

### Custom Range Example

```
You: /range 1 1000
Bot: Great! I've picked a number between 1 and 1000.
     Start guessing!

You: 500
Bot: Too low! Try a higher number.
     Attempts: 1
```

## Input Validation

The bot handles various edge cases:

- Non-numeric input: "Please send a valid number!"
- Out of range guesses: "Please guess a number between [min] and [max]!"
- Invalid range parameters: "Invalid range! The minimum value must be less than the maximum value."
- No active game: "No active game! Start a new game with /start or /newgame"

## Architecture

### Game State Management

Each chat maintains its own game state with:
- `min`: Minimum value of the range
- `max`: Maximum value of the range
- `target`: The secret number to guess
- `attempts`: Number of guesses made

Game states are stored in-memory using a Map, keyed by chat ID. This allows multiple users or groups to play simultaneously without interference.

### Key Files

- `bot.js` - Main bot logic and command handlers
- `.env` - Environment configuration (not committed to git)
- `package.json` - Node.js dependencies and scripts

## Development

To modify the bot:

1. Edit `bot.js` with your changes
2. Restart the bot with `npm start`

## Troubleshooting

**Bot doesn't respond:**
- Check that the bot is running (`npm start`)
- Verify your bot token is correct in `.env`
- Make sure you started the bot with `/start` in Telegram

**"ETELEGRAM: 409 Conflict" error:**
- Only one instance of the bot can run at a time
- Stop any other running instances
- Wait a few seconds and try again

**Environment variable errors:**
- Ensure `.env` file exists in the project root
- Check that `TELEGRAM_BOT_TOKEN` is set correctly
- No quotes needed around the token value

## License

ISC
