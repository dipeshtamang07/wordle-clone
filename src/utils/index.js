export function isAlphabetic(character) {
  if (character.length !== 1) return false;
  const code = character.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

export function getLetterCount(word, letter) {
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) count++;
  }
  return count;
}

export function getRowBgColors(hiddenWord, guess) {
  const hiddenWordArr = hiddenWord.split("");
  const feedback = Array(guess.length).fill("#787C7E");

  // First pass for green tiles
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === hiddenWordArr[i]) {
      feedback[i] = "#6AAA64";
      hiddenWordArr[i] = null; // Remove the letter from further consideration
    }
  }

  // Second pass for yellow and gray tiles
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === "#6AAA64") {
      continue;
    }
    const index = hiddenWordArr.indexOf(guess[i]);
    if (index !== -1) {
      feedback[i] = "#C9B458";
      hiddenWordArr[index] = null; // Remove the letter from further consideration
    }
  }

  return feedback;
}
