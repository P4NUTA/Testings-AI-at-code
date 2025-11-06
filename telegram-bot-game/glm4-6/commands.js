const GameState = require('./gameState');

class CommandHandlers {
  constructor(bot) {
    this.bot = bot;
    this.gameState = new GameState();
  }

  // Handle /start command
  handleStart(msg) {
    const chatId = msg.chat.id;
    const welcomeMessage = `
🎮 Welcome to the Number Guessing Game!

I'm thinking of a number, and you need to guess it!

Commands:
/start - Show this welcome message
/newgame - Start a new game
/range [min] [max] - Set custom range (e.g., /range 1 1000)
/help - Show help

Type /newgame to begin playing! 🎯
    `;

    this.bot.sendMessage(chatId, welcomeMessage);
  }

  // Handle /newgame command
  handleNewgame(msg) {
    const chatId = msg.chat.id;
    const game = this.gameState.startNewGame(chatId);

    const message = `
🎲 New game started!

I'm thinking of a number between ${game.min} and ${game.max}.

Take a guess! 🎯
    `;

    this.bot.sendMessage(chatId, message);
  }

  // Handle /range command
  handleRange(msg) {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Parse the command arguments
    const parts = text.split(' ');

    if (parts.length !== 3) {
      const game = this.gameState.getGame(chatId);
      this.bot.sendMessage(
        chatId,
        `Current range: ${game.min}-${game.max}\n\nUsage: /range [min] [max]\nExample: /range 1 1000`
      );
      return;
    }

    const min = parseInt(parts[1]);
    const max = parseInt(parts[2]);

    if (isNaN(min) || isNaN(max)) {
      this.bot.sendMessage(chatId, '❌ Please provide valid numbers for range!');
      return;
    }

    const result = this.gameState.setRange(chatId, min, max);
    this.bot.sendMessage(chatId, result.message);
  }

  // Handle /help command
  handleHelp(msg) {
    const chatId = msg.chat.id;
    const gameStatus = this.gameState.getGameStatus(chatId);

    const helpMessage = `
🎯 Number Guessing Game Help

Commands:
/start - Show welcome message
/newgame - Start a new game
/range [min] [max] - Set custom range (e.g., /range 1 1000)
/help - Show this help

How to play:
1. Start a game with /newgame
2. I'll pick a random number
3. Send me your guess
4. I'll tell you if it's higher or lower
5. Keep guessing until you find it!

${gameStatus}

Good luck! 🍀
    `;

    this.bot.sendMessage(chatId, helpMessage);
  }

  // Handle number guesses
  handleGuess(msg) {
    const chatId = msg.chat.id;
    const guess = parseInt(msg.text);

    const result = this.gameState.makeGuess(chatId, guess);

    if (result.isCorrect) {
      // Send winning message and offer new game
      const keyboard = {
        reply_markup: {
          inline_keyboard: [[
            { text: '🎮 New Game', callback_data: 'newgame' },
            { text: '📊 Stats', callback_data: 'stats' }
          ]]
        }
      };

      this.bot.sendMessage(chatId, result.message, keyboard);
    } else {
      // Send hint or error message
      this.bot.sendMessage(chatId, result.message);
    }
  }

  // Handle callback queries (for inline keyboards)
  handleCallbackQuery(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (data === 'newgame') {
      this.handleNewgame({ chat: { id: chatId } });
      this.bot.answerCallbackQuery(callbackQuery.id);
    } else if (data === 'stats') {
      const game = this.gameState.getGame(chatId);
      const statsMessage = `
📊 Game Statistics

Range: ${game.min} - ${game.max}
Last game attempts: ${game.attempts}
Status: ${game.isActive ? 'In progress' : 'Not started'}

Use /newgame to start a new game! 🎮
      `;
      this.bot.sendMessage(chatId, statsMessage);
      this.bot.answerCallbackQuery(callbackQuery.id);
    }
  }
}

module.exports = CommandHandlers;