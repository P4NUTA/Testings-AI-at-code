# Telegram Number Guessing Bot 🎯

A fun Telegram bot that plays a number-guessing game with users. The bot picks a random number and responds to each guess with "higher" or "lower" until the user guesses correctly.

## Features

- 🎮 Interactive number guessing game
- 📊 Tracks attempts per game
- 🎯 Customizable number ranges
- 🏱 Multiple games can run simultaneously for different chats
- 💬 Simple command interface
- 🔔 Inline keyboard for quick actions

## Commands

- `/start` - Show welcome message and instructions
- `/newgame` - Start a new game
- `/range [min] [max]` - Set custom range (e.g., `/range 1 1000`)
- `/help` - Show help and game status

## How it Works

1. Start a game with `/newgame`
2. The bot picks a random number (default: 1-100)
3. Send your guess as a regular message
4. Bot responds with "Higher" or "Lower"
5. Keep guessing until you find the number
6. After winning, see your attempt count and start a new game

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A Telegram Bot token from [@BotFather](https://t.me/BotFather)

### Getting a Bot Token

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the prompts to create your bot
4. Copy the bot token you receive

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file and add your bot token:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

5. Start the bot:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── bot.js              # Main bot entry point
├── gameState.js        # Game state management
├── commands.js         # Command handlers
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Game Features

- **Per-chat game state**: Each chat has its own independent game
- **Input validation**: Handles invalid numbers gracefully
- **Custom ranges**: Set any number range with `/range` command
- **Attempt tracking**: Shows how many guesses you've made
- **Keyboard shortcuts**: Quick actions after winning
- **Error handling**: Robust error handling and logging

## Example Gameplay

```
User: /newgame
Bot: 🎲 New game started!
     I'm thinking of a number between 1 and 100.
     Take a guess! 🎯

User: 50
Bot: 📈 Higher! (Attempt 1)

User: 75
Bot: 📉 Lower! (Attempt 2)

User: 62
Bot: 🎉 Congratulations! You guessed the number 62 in 3 attempts!
     [🎮 New Game] [📊 Stats]
```

## Deployment

The bot can be deployed on any platform that supports Node.js:

- **VPS**: DigitalOcean, Linode, AWS EC2
- **PaaS**: Heroku, Render, Railway
- **Serverless**: AWS Lambda (with modifications)
- **Docker**: Create a Dockerfile for containerization

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "bot.js"]
```

Build and run:
```bash
docker build -t telegram-number-bot .
docker run -d --name bot -e TELEGRAM_BOT_TOKEN=your_token telegram-number-bot
```

## Environment Variables

- `TELEGRAM_BOT_TOKEN`: Your bot's token from BotFather (required)

## License

MIT License - feel free to use this code for your own projects!