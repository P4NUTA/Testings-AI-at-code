require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN environment variable is not set');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Store game state per chat
const games = new Map();

// Default range
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;

function getGame(chatId) {
  return games.get(chatId);
}

function createGame(chatId, min = DEFAULT_MIN, max = DEFAULT_MAX) {
  const secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const game = {
    secretNumber,
    min,
    max,
    attempts: 0,
    active: true
  };
  games.set(chatId, game);
  return game;
}

function formatRange(game) {
  return `${game.min}–${game.max}`;
}

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const game = createGame(chatId);

  bot.sendMessage(chatId,
    `Welcome to the Number Guessing Game!\n\n` +
    `I'm thinking of a number between ${formatRange(game)}.\n` +
    `Try to guess it! Just type a number.\n\n` +
    `Commands:\n` +
    `/newgame - Start a new game\n` +
    `/range <min> <max> - Set custom range (e.g., /range 1 1000)\n` +
    `/help - Show help`
  );
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    `Number Guessing Game - Help\n\n` +
    `How to play:\n` +
    `1. I pick a random number in a range\n` +
    `2. You guess by sending a number\n` +
    `3. I'll tell you if the answer is higher or lower\n` +
    `4. Keep guessing until you find it!\n\n` +
    `Commands:\n` +
    `/start - Start the bot and a new game\n` +
    `/newgame - Start a new game with current range\n` +
    `/range <min> <max> - Set custom range and start new game\n` +
    `  Example: /range 1 1000\n` +
    `/help - Show this help message`
  );
});

// /newgame command
bot.onText(/\/newgame/, (msg) => {
  const chatId = msg.chat.id;
  const existingGame = getGame(chatId);
  const min = existingGame?.min || DEFAULT_MIN;
  const max = existingGame?.max || DEFAULT_MAX;

  const game = createGame(chatId, min, max);

  bot.sendMessage(chatId,
    `New game started!\n` +
    `I'm thinking of a number between ${formatRange(game)}.\n` +
    `Make your guess!`
  );
});

// /range command
bot.onText(/\/range(?:\s+(\d+)\s+(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;

  if (!match[1] || !match[2]) {
    const game = getGame(chatId);
    const currentRange = game ? formatRange(game) : `${DEFAULT_MIN}–${DEFAULT_MAX}`;
    bot.sendMessage(chatId,
      `Current range: ${currentRange}\n\n` +
      `Usage: /range <min> <max>\n` +
      `Example: /range 1 1000`
    );
    return;
  }

  const min = parseInt(match[1], 10);
  const max = parseInt(match[2], 10);

  if (min >= max) {
    bot.sendMessage(chatId,
      `Invalid range! The minimum must be less than the maximum.\n` +
      `Example: /range 1 1000`
    );
    return;
  }

  if (max - min < 1) {
    bot.sendMessage(chatId,
      `Range too small! Please use a larger range.`
    );
    return;
  }

  const game = createGame(chatId, min, max);

  bot.sendMessage(chatId,
    `Range updated to ${formatRange(game)}!\n` +
    `New game started. Make your guess!`
  );
});

// Handle guesses (any message that's a number)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore commands
  if (!text || text.startsWith('/')) {
    return;
  }

  // Check if input is a valid number
  const guess = parseInt(text.trim(), 10);

  if (isNaN(guess)) {
    bot.sendMessage(chatId,
      `Please enter a valid number, or use /help for commands.`
    );
    return;
  }

  const game = getGame(chatId);

  if (!game || !game.active) {
    bot.sendMessage(chatId,
      `No active game! Use /newgame to start playing.`
    );
    return;
  }

  // Check if guess is in range
  if (guess < game.min || guess > game.max) {
    bot.sendMessage(chatId,
      `Please guess a number between ${formatRange(game)}.`
    );
    return;
  }

  game.attempts++;

  if (guess < game.secretNumber) {
    bot.sendMessage(chatId, `Higher! Try again.`);
  } else if (guess > game.secretNumber) {
    bot.sendMessage(chatId, `Lower! Try again.`);
  } else {
    // Winner!
    game.active = false;
    const attempts = game.attempts;
    const attemptWord = attempts === 1 ? 'attempt' : 'attempts';

    bot.sendMessage(chatId,
      `Congratulations! You guessed it!\n\n` +
      `The number was ${game.secretNumber}.\n` +
      `You found it in ${attempts} ${attemptWord}!\n\n` +
      `Want to play again? Use /newgame or /range to start a new game.`
    );
  }
});

// Handle polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

console.log('Number Guessing Bot is running...');
