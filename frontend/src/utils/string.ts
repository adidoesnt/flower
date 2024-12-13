export const toFirstLetterUpperCase = (text: string) => {
  const letters = text.split("");
  const firstLetter = letters[0].toUpperCase();
  letters.shift();
  const otherLetters = letters.join("");
  return `${firstLetter}${otherLetters}`;
};
