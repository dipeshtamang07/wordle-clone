export function isAlphabetic(character) {
  if (character.length !== 1) return false;
  const code = character.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
