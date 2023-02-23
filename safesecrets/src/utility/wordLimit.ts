/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
const getWordWithLimitedLength = (word: string) => {
  const width = screen.width;
  let wordLen = 0;
  if (width <= 480) {
    wordLen = 10;
  } else if (width <= 756) {
    wordLen = 20;
  } else {
    wordLen = 40;
  }
  return `${word.substring(0, wordLen)}...`;
};

export default getWordWithLimitedLength;
