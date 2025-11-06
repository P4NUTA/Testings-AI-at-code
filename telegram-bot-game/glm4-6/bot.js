require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const CommandHandlers = require('./commands');

// Check if bot token is provided
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN environment variable is not set');
  console.log('Please create a .env file with your bot token');
  console.log('You can copy .env.example to .env and fill in your token');
  process.exit(1);
}

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Initialize command handlers
const commands = new CommandHandlers(bot);

console.log('🤖 Telegram Number Guessing Bot started successfully!');
console.log('Bot is polling for messages...');

// Command handlers
bot.onText(/\/start/, (msg) => {
  console.log(`📱 /start command from ${msg.chat.first_name} (${msg.chat.id})`);
  commands.handleStart(msg);
});

bot.onText(/\/newgame/, (msg) => {
  console.log(`🎮 /newgame command from ${msg.chat.first_name} (${msg.chat.id})`);
  commands.handleNewgame(msg);
});

bot.onText(/\/range/, (msg) => {
  console.log(`📏 /range command from ${msg.chat.first_name} (${msg.chat.id})`);
  commands.handleRange(msg);
});

bot.onText(/\/help/, (msg) => {
  console.log(`❓ /help command from ${msg.chat.first_name} (${msg.chat.id})`);
  commands.handleHelp(msg);
});

// Handle callback queries (inline keyboards)
bot.on('callback_query', (callbackQuery) => {
  console.log(`🔘 Callback query: ${callbackQuery.data} from ${callbackQuery.message.chat.first_name}`);
  commands.handleCallbackQuery(callbackQuery);
});

// Handle regular messages (number guesses)
bot.on('message', (msg) => {
  // Ignore commands (they start with /)
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }

  // Only process text messages that could be number guesses
  if (msg.text) {
    console.log(`💬 Message from ${msg.chat.first_name} (${msg.chat.id}): ${msg.text}`);

    // Check if it's a number
    const guess = parseInt(msg.text);
    if (!isNaN(guess)) {
      commands.handleGuess(msg);
    } else {
      // Send a helpful message for non-number inputs
      const chatId = msg.chat.id;
      bot.sendMessage(
        chatId,
        '❓ I don\'t understand that. Please send a number as your guess, or use /help for commands.'
      );
    }
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('❌ Polling error:', error);
});

bot.on('error', (error) => {
  console.error('❌ Bot error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down bot gracefully...');
  bot.stopPolling()
    .then(() => {
      console.log('✅ Bot stopped successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error stopping bot:', error);
      process.exit(1);
    });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  bot.stopPolling()
    .then(() => {
      console.log('✅ Bot stopped successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error stopping bot:', error);
      process.exit(1);
    });
});

// Set bot commands in Telegram
bot.setMyCommands([
  { command: 'start', description: 'Show welcome message' },
  { command: 'newgame', description: 'Start a new game' },
  { command: 'range', description: 'Set custom range (e.g., /range 1 1000)' },
  { command: 'help', description: 'Show help' }
]).then(() => {
  console.log('✅ Bot commands set successfully');
}).catch((error) => {
  console.error('❌ Error setting bot commands:', error);
});