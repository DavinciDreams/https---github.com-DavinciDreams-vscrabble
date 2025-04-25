import { GameBoard, Position } from './types'

export function validateWords(board: GameBoard, placedTiles: Position[]): {
  isValid: boolean;
  words: string[];
  error?: string;
} {
  const words = getFormedWords(board, placedTiles);
  // You can use an official Scrabble dictionary API or word list here
  const dictionary = new Set(['WORD', 'LIST', 'HERE']); 
  
  const invalidWords = words.filter(word => !dictionary.has(word.toUpperCase()));
  
  if (invalidWords.length > 0) {
    return {
      isValid: false,
      words: invalidWords,
      error: `Invalid word(s): ${invalidWords.join(', ')}`
    };
  }

  return { isValid: true, words };
}