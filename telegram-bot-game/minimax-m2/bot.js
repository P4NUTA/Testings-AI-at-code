const { Telegraf } = require('telegraf');

// Bot token - get from @BotFather
const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';

const bot = new Telegraf(BOT_TOKEN);

// Game state storage - in-memory storage per chat
// Structure: { [chatId]: { targetNumber, minRange, maxRange, attempts, gameActive } }
const gameStates = new Map();

/**
 * Start a new game for a chat
 */
function startNewGame(ctx) {
  const chatId = ctx.chat.id;
  const state = gameStates.get(chatId) || {};

  // Use current range or default to 1-100
  const minRange = state.minRange || 1;
  const maxRange = state.maxRange || 100;

  // Generate random number
  const targetNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

  // Update state
  const newState = {
    targetNumber,
    minRange,
    maxRange,
    attempts: 0,
    gameActive: true
  };

  gameStates.set(chatId, newState);

  ctx.reply(
    `🎮 New game started!\n` +
    `I'm thinking of a number between ${minRange} and ${maxRange}.\n` +
    `Try to guess it!`
  );
}

/**
 * Process a guess
 */
function processGuess(ctx, guess) {
  const chatId = ctx.chat.id;
  const state = gameStates.get(chatId);

  // Check if game is active
  if (!state || !state.gameActive) {
    ctx.reply('No active game. Use /newgame to start a new game!');
    return;
  }

  // Validate guess is within range
  if (guess < state.minRange || guess > state.maxRange) {
    ctx.reply(
      `Please guess a number between ${state.minRange} and ${state.maxRange}.`
    );
    return;
  }

  // Increment attempts
  state.attempts++;

  // Check if correct
  if (guess === state.targetNumber) {
    state.gameActive = false;
    gameStates.set(chatId, state);

    ctx.reply(
      `🎉 Correct! The number was ${state.targetNumber}.\n` +
      `You guessed it in ${state.attempts} ${state.attempts === 1 ? 'attempt' : 'attempts'}!\n` +
      `Type /newgame to play again or /range to change the range.`
    );
  } else if (guess < state.targetNumber) {
    ctx.reply('📈 Higher!');
  } else {
    ctx.reply('📉 Lower!');
  }
}

// Command: /start
bot.start((ctx) => {
  ctx.reply(
    'Welcome to the Number Guessing Game! 🎮\n' +
    '\n' +
    'I\'ll think of a number and you try to guess it.\n' +
    'I\'ll tell you if your guess is higher or lower.\n' +
    '\n' +
    'Commands:\n' +
    '/newgame - Start a new game\n' +
    '/range <min> <max> - Set the number range (e.g., /range 1 1000)\n' +
    '/help - Show this help message\n' +
    '\n' +
    'Let\'s start! Type /newgame to begin.'
  );
});

// Command: /help
bot.help((ctx) => {
  ctx.reply(
    '📖 How to Play:\n' +
    '\n' +
    '1. Start a game with /newgame\n' +
    '2. I\'ll pick a random number in the current range\n' +
    '3. Guess the number and I\'ll say "higher" or "lower"\n' +
    '4. Try to guess in as few attempts as possible!\n' +
    '\n' +
    '🔧 Commands:\n' +
    '/newgame - Start a new game\n' +
    '/range <min> <max> - Change the number range\n' +
    '/help - Show this help\n' +
    '\n' +
    'Current range is 1-100. Change it with /range!'
  );
});

// Command: /newgame
bot.command('newgame', (ctx) => {
  startNewGame(ctx);
});

// Command: /range
bot.command('range', (ctx) => {
  const args = ctx.message.text.split(' ').slice(1);

  if (args.length !== 2) {
    const state = gameStates.get(ctx.chat.id);
    const currentMin = state?.minRange || 1;
    const currentMax = state?.maxRange || 100;
    ctx.reply(
      `Current range: ${currentMin} - ${currentMax}\n` +
      `Usage: /range <min> <max>\n` +
      `Example: /range 1 1000`
    );
    return;
  }

  const min = parseInt(args[0]);
  const max = parseInt(args[1]);

  // Validate input
  if (isNaN(min) || isNaN(max)) {
    ctx.reply('Please provide valid numbers. Example: /range 1 100');
    return;
  }

  if (min >= max) {
    ctx.reply('The minimum must be less than the maximum. Example: /range 1 100');
    return;
  }

  if (min < -1000000 || max > 1000000) {
    ctx.reply('Please keep numbers between -1,000,000 and 1,000,000.');
    return;
  }

  // Update or create state with new range
  const state = gameStates.get(ctx.chat.id) || {};
  state.minRange = min;
  state.maxRange = max;
  state.gameActive = false; // Deactivate current game if any
  gameStates.set(ctx.chat.id, state);

  ctx.reply(
    `✅ Range updated to ${min} - ${max}\n` +
    `Type /newgame to start a new game with this range!`
  );
});

// Handle regular messages (guesses)
bot.on('text', (ctx) => {
  const message = ctx.message.text;

  // Skip if it's a command
  if (message.startsWith('/')) {
    return;
  }

  // Try to parse as number
  const guess = parseInt(message);

  // Check if it's a valid number
  if (isNaN(guess)) {
    ctx.reply('Please send a valid number to guess.');
    return;
  }

  processGuess(ctx, guess);
});

// Error handling
bot.catch((err, ctx) => {
  console.log(`Error for ${ctx.updateType}:`, err);
  ctx.reply('Sorry, something went wrong! Please try again.');
});

// Launch bot
bot.launch().then(() => {
  console.log('🤖 Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
