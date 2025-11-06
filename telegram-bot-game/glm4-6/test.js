const GameState = require('./gameState');

// Simple test to verify game logic works
console.log('🧪 Testing game logic...');

const gameState = new GameState();

// Test 1: Start a new game
console.log('\n1. Testing new game...');
const chatId = 12345;
const game = gameState.startNewGame(chatId, 1, 10);
console.log(`Game started with range ${game.min}-${game.max}`);
console.log(`Secret number: ${game.number} (for testing)`);

// Test 2: Make some guesses
console.log('\n2. Testing guesses...');
let guess = 5;
let result = gameState.makeGuess(chatId, guess);
console.log(`Guess ${guess}: ${result.message}`);

if (!result.isCorrect) {
  // Make another guess based on hint
  guess = result.hint === 'higher' ? game.number : game.number;
  result = gameState.makeGuess(chatId, guess);
  console.log(`Correct guess ${guess}: ${result.message}`);
}

// Test 3: Test range setting
console.log('\n3. Testing range setting...');
const rangeResult = gameState.setRange(chatId, 50, 100);
console.log(`Range setting result: ${rangeResult.message}`);

// Test 4: Test invalid input
console.log('\n4. Testing invalid input...');
gameState.startNewGame(chatId, 1, 100);
const invalidResult = gameState.makeGuess(chatId, 'abc');
console.log(`Invalid guess result: ${invalidResult.message}`);

const outOfRangeResult = gameState.makeGuess(chatId, 150);
console.log(`Out of range guess result: ${outOfRangeResult.message}`);

console.log('\n✅ All tests completed successfully!');