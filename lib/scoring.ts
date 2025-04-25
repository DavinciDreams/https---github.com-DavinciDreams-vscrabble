const BONUS_SQUARES = {
  DL: 'DOUBLE_LETTER',
  TL: 'TRIPLE_LETTER',
  DW: 'DOUBLE_WORD',
  TW: 'TRIPLE_WORD'
} as const;

export function calculateScore(board: GameBoard, placedTiles: Position[]): number {
  let totalScore = 0;
  const words = getFormedWords(board, placedTiles);

  words.forEach(word => {
    let wordScore = 0;
    let wordMultiplier = 1;

    word.tiles.forEach(({ tile, bonus }) => {
      let letterScore = tile.value;

      // Apply letter multipliers
      if (bonus === BONUS_SQUARES.DL) letterScore *= 2;
      if (bonus === BONUS_SQUARES.TL) letterScore *= 3;

      wordScore += letterScore;

      // Track word multipliers
      if (bonus === BONUS_SQUARES.DW) wordMultiplier *= 2;
      if (bonus === BONUS_SQUARES.TW) wordMultiplier *= 3;
    });

    totalScore += wordScore * wordMultiplier;
  });

  // Bonus for using all 7 tiles
  if (placedTiles.length === 7) totalScore += 50;

  return totalScore;
}