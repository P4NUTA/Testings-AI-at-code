require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Validate environment variables
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set in .env file');
  process.exit(1);
}

// Initialize bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Game state storage (in-memory)
// Key: chatId, Value: { min, max, target, attempts }
const games = new Map();

// Default range
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;

/**
 * Initialize a new game for a chat
 */
function initializeGame(chatId, min = DEFAULT_MIN, max = DEFAULT_MAX) {
  const target = Math.floor(Math.random() * (max - min + 1)) + min;
  games.set(chatId, {
    min,
    max,
    target,
    attempts: 0
  });
  return { min, max };
}

/**
 * Get game state for a chat
 */
function getGame(chatId) {
  return games.get(chatId);
}

/**
 * Check if game exists for a chat
 */
function hasGame(chatId) {
  return games.has(chatId);
}

/**
 * Delete game for a chat
 */
function deleteGame(chatId) {
  games.delete(chatId);
}

// Command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const { min, max } = initializeGame(chatId);

  bot.sendMessage(
    chatId,
    `Welcome to the Number Guessing Game!\n\n` +
    `I've picked a number between ${min} and ${max}.\n` +
    `Try to guess it! Just send me a number.\n\n` +
    `Commands:\n` +
    `/newgame - Start a new game\n` +
    `/range [min] [max] - Set a custom range (e.g., /range 1 1000)\n` +
    `/help - Show this help message`
  );
});

// Command: /newgame
bot.onText(/\/newgame/, (msg) => {
  const chatId = msg.chat.id;
  const game = getGame(chatId);

  // Use existing range if available, otherwise use defaults
  const min = game ? game.min : DEFAULT_MIN;
  const max = game ? game.max : DEFAULT_MAX;

  initializeGame(chatId, min, max);

  bot.sendMessage(
    chatId,
    `New game started!\n` +
    `I've picked a new number between ${min} and ${max}.\n` +
    `Good luck!`
  );
});

// Command: /range
bot.onText(/\/range(?:\s+(\d+)\s+(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;

  // Check if parameters were provided
  if (!match[1] || !match[2]) {
    bot.sendMessage(
      chatId,
      `Usage: /range [min] [max]\n\n` +
      `Example: /range 1 1000\n\n` +
      `This will start a new game with numbers between 1 and 1000.`
    );
    return;
  }

  const min = parseInt(match[1]);
  const max = parseInt(match[2]);

  // Validate range
  if (min >= max) {
    bot.sendMessage(
      chatId,
      `Invalid range! The minimum value must be less than the maximum value.\n` +
      `Please try again with a valid range.`
    );
    return;
  }

  if (max - min < 1) {
    bot.sendMessage(
      chatId,
      `Invalid range! The range must have at least 2 numbers.`
    );
    return;
  }

  // Initialize game with new range
  initializeGame(chatId, min, max);

  bot.sendMessage(
    chatId,
    `Great! I've picked a number between ${min} and ${max}.\n` +
    `Start guessing!`
  );
});

// Command: /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `*Number Guessing Game - Help*\n\n` +
    `*How to play:*\n` +
    `I'll pick a random number in a range, and you try to guess it.\n` +
    `I'll tell you if your guess is too high or too low.\n\n` +
    `*Commands:*\n` +
    `/start - Start a new game (default range: 1-100)\n` +
    `/newgame - Start a new game with the same range\n` +
    `/range [min] [max] - Set a custom range and start a new game\n` +
    `  Example: /range 1 1000\n` +
    `/help - Show this help message\n\n` +
    `*Tips:*\n` +
    `- Just send a number to make a guess\n` +
    `- Try to guess in as few attempts as possible!\n` +
    `- Use binary search strategy for faster wins`,
    { parse_mode: 'Markdown' }
  );
});

// Handle regular messages (guesses)
bot.on('message', (msg) => {
  // Skip if it's a command
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }

  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if game exists
  if (!hasGame(chatId)) {
    bot.sendMessage(
      chatId,
      `No active game! Start a new game with /start or /newgame`
    );
    return;
  }

  // Validate input is a number
  const guess = parseInt(text);

  if (isNaN(guess)) {
    bot.sendMessage(
      chatId,
      `Please send a valid number! Your guess: "${text}" is not a number.`
    );
    return;
  }

  const game = getGame(chatId);

  // Check if guess is within range
  if (guess < game.min || guess > game.max) {
    bot.sendMessage(
      chatId,
      `Please guess a number between ${game.min} and ${game.max}!`
    );
    return;
  }

  // Increment attempts
  game.attempts++;

  // Check if correct
  if (guess === game.target) {
    const attempts = game.attempts;
    const attemptsText = attempts === 1 ? '1 attempt' : `${attempts} attempts`;

    bot.sendMessage(
      chatId,
      `Congratulations! You guessed it!\n\n` +
      `The number was ${game.target}.\n` +
      `You took ${attemptsText} to win.\n\n` +
      `Would you like to play again? Use /newgame to start a new game!`
    );

    // Keep the game state so /newgame can use the same range
    // but reset it with a new target
    const { min, max } = game;
    initializeGame(chatId, min, max);
  }
  // Check if too low
  else if (guess < game.target) {
    bot.sendMessage(
      chatId,
      `Too low! Try a higher number.\n` +
      `Attempts: ${game.attempts}`
    );
  }
  // Must be too high
  else {
    bot.sendMessage(
      chatId,
      `Too high! Try a lower number.\n` +
      `Attempts: ${game.attempts}`
    );
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

console.log('Bot is running...');
console.log('Press Ctrl+C to stop.');
