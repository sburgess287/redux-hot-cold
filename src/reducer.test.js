// import the reducers
// import the actions

import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';


describe('reducer', () => {

  // dummy data
  const guessNan = 'a'

  let defaultState = {
    guesses: [],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: 54 // this number stays the same

  };

  // Test failing because the correct answer is updating each run. its alive.
  it('should set the initial state when nothing is passed in', () => {
    
  
    let state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual(defaultState.guesses)
    expect(state.feedback).toEqual(defaultState.feedback)
    expect(state.auralStatus).toEqual(defaultState.auralStatus)
    expect(state.correctAnswer).toBeGreaterThanOrEqual(1)
    expect(state.correctAnswer).toBeLessThanOrEqual(100)
  })

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });


  // restart game tests
  describe('restart game should reset game', () => {
    let state = {
      guesses: [1, 2, 3, 4],
      feedback: 'Awesome',
      correctAnswer: 4
    };

    const correctAnswer = 10
    state = reducer(state, restartGame(correctAnswer));
  
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!')
    expect(state.auralStatus).toEqual('')
    expect(state.correctAnswer).toEqual(correctAnswer);
    
  })


  // Make guess tests
  describe('Guess should require a valid number', () => {
    let state = {
      guesses: guessNan
    }
    const feedback = 'Please enter a valid number.'
    state = reducer(state, makeGuess(guessNan));

    expect(state).toEqual({
      feedback, 
      guesses: [ guessNan, NaN]
    });
  });

  describe('Guess difference should return correct feedback', () => {
    const iceColdGuess = 51;
    const coldGuess = 31;
    const warmGuess = 11;
    const hotGuess = 2
    const correctGuess=1

    const iceColdFeedback = "You're Ice Cold...";
    const coldFeedback = "You're Cold...";
    const warmFeedback = "You're Warm.";
    const hotFeedback = "You're Hot!";
    const correctFeedback = 'You got it!';

    let state = {
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: 1 
  
    };

    state = reducer(state,makeGuess(iceColdGuess));
    expect(state.feedback).toEqual(iceColdFeedback);

    state = reducer(state,makeGuess(coldGuess));
    expect(state.feedback).toEqual(coldFeedback);

    state = reducer(state,makeGuess(warmGuess));
    expect(state.feedback).toEqual(warmFeedback);

    state = reducer(state,makeGuess(hotGuess));
    expect(state.feedback).toEqual(hotFeedback);

    state = reducer(state,makeGuess(correctGuess));
    expect(state.feedback).toEqual(correctFeedback);

  })


  // Generate Aural update tests
  describe('Generate Aural Feedback returns correct feedback', () => {
    let state = {
      guesses: [ 35, 10],
      feedback: '',
      auralStatus: '',
      correctAnswer: 1 
    };
    const guesses = [ 35, 10]
    const returnedAuralStatus = `Here's the status of the game right now:  You've made 2 guesses. In order of most- to least-recent, they are: 10, 35`

    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual(returnedAuralStatus)

  })


})