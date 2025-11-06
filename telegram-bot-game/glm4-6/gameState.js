class GameState {
  constructor() {
    this.games = new Map(); // chatId -> game state
  }

  // Get or create a game for a specific chat
  getGame(chatId) {
    if (!this.games.has(chatId)) {
      this.games.set(chatId, {
        number: null,
        min: 1,
        max: 100,
        attempts: 0,
        isActive: false
      });
    }
    return this.games.get(chatId);
  }

  // Start a new game
  startNewGame(chatId, min = 1, max = 100) {
    const game = this.getGame(chatId);
    game.number = Math.floor(Math.random() * (max - min + 1)) + min;
    game.min = min;
    game.max = max;
    game.attempts = 0;
    game.isActive = true;
    return game;
  }

  // Make a guess
  makeGuess(chatId, guess) {
    const game = this.getGame(chatId);

    if (!game.isActive) {
      return { success: false, message: 'No active game. Use /newgame to start!' };
    }

    // Validate guess
    if (isNaN(guess)) {
      return { success: false, message: 'Please enter a valid number!' };
    }

    if (guess < game.min || guess > game.max) {
      return {
        success: false,
        message: `Please enter a number between ${game.min} and ${game.max}!`
      };
    }

    game.attempts++;

    if (guess === game.number) {
      const result = {
        success: true,
        isCorrect: true,
        message: `🎉 Congratulations! You guessed the number ${game.number} in ${game.attempts} attempts!`,
        attempts: game.attempts
      };
      game.isActive = false;
      return result;
    } else if (guess < game.number) {
      return {
        success: true,
        isCorrect: false,
        message: `📈 Higher! (Attempt ${game.attempts})`,
        hint: 'higher',
        attempts: game.attempts
      };
    } else {
      return {
        success: true,
        isCorrect: false,
        message: `📉 Lower! (Attempt ${game.attempts})`,
        hint: 'lower',
        attempts: game.attempts
      };
    }
  }

  // Set custom range for a game
  setRange(chatId, min, max) {
    if (min >= max) {
      return { success: false, message: 'Minimum value must be less than maximum value!' };
    }

    const game = this.getGame(chatId);
    game.min = min;
    game.max = max;

    // If there's an active game, restart it with new range
    if (game.isActive) {
      this.startNewGame(chatId, min, max);
      return {
        success: true,
        message: `Range updated to ${min}-${max}. New game started!`
      };
    }

    return {
      success: true,
      message: `Range set to ${min}-${max}. Use /newgame to start!`
    };
  }

  // Get game status
  getGameStatus(chatId) {
    const game = this.getGame(chatId);

    if (!game.isActive) {
      return 'No active game. Use /newgame to start!';
    }

    return `Current game: Guess a number between ${game.min} and ${game.max}.\nAttempts: ${game.attempts}`;
  }

  // End game for a chat
  endGame(chatId) {
    const game = this.getGame(chatId);
    game.isActive = false;
    return game;
  }
}

module.exports = GameState;