/**
 * @summary A string is called a palindrome if it reads the same forwards and backwards.
 * E.g: "a", "noon" and "tacocat" are palindromes but "cocoa" isn't.
 *
 * A string is called a near-palindrome if we can rearrange its characters to make it a palindrome.
 * For example: "aaa", "cocoa" and "xxyyzz" are near-palindromes but "abc" isn't.
 *
 * You are given a String **word** of lowercase English letters. You are allowed to perform a sequence of operations. In each operation you can choose an index into **word** and either increment or decrement the character at that index.
 * (Incrementing 'a' turns it into 'b', incrementing 'b' gives 'c', ..., and if we increment 'z' we get 'a' again. Decrementing is the inverse operation.)
 *
 * Determine and return the smallest number of operations needed to turn **word** into a near-palindrome.
 *
 * @param {string} word - A string of lowercase English letters
 * @returns {number} - The smallest number of operations needed to turn **word** into a near-palindrome
 *
 * @constraints
 * - **word** will contain between 1 and 2,500 characters, inclusive
 * - Each character of **word** will be a lowercase English letter ('a'-'z').
 */

export class NearPalindromesDiv1 {
  solve(word) {
    this.validateWord(word);
    return this.toBeNearPalindrome(word);
  }
  // if is par then all letters must be even
  // if is odd then all letters must be even except one
  /**
   *
   * @param {*} word
   * @returns The smallest number of operations needed to turn **word** into a near-palindrome
   */
  toBeNearPalindrome(word) {
    const letterPairsCount = this.resolveLetterPairsCount(word);
    const isOddWord = this.checkOddWord(word);
    let oddLettersCount = 0;

    for (const count of letterPairsCount.values()) {
      if (count % 2 !== 0) {
        oddLettersCount++;
      }
    }

    if(isOddWord) {
      return (oddLettersCount - 1) - ((oddLettersCount - 1) / 2);
    }

    return oddLettersCount - (oddLettersCount / 2)
  }

  resolveLetterPairsCount(word) {
    const letterPairsCount = new Map();

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const count = letterPairsCount.get(letter) || 0;
      letterPairsCount.set(letter, count + 1);
    }

    return letterPairsCount;
  }

  checkOddWord(word) {
    return word.length % 2 !== 0;
  }

  validateWord(word) {
    if (word.length < 1 || word.length > 2500) {
      throw new Error("The word length must be between 1 and 2500");
    }

    if (!word.match(/^[a-z]+$/)) {
      throw new Error("The word must contain only lowercase English letters");
    }
  }
}
