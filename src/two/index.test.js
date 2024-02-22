import { describe, expect, it } from "vitest";
import { NearPalindromesDiv1 } from ".";

describe("NearPalindromesDiv1 tests", () => {
  const nearPalindromesDiv1 = new NearPalindromesDiv1();

  describe("When the checkOddWord method is called", () => {
    it("should return true if the word is odd", () => {
      const result = nearPalindromesDiv1.checkOddWord("a");
      expect(result).toBe(true);
    });

    it("should return false if the word is even", () => {
      const result = nearPalindromesDiv1.checkOddWord("aa");
      expect(result).toBe(false);
    });
  });

  describe("When the validateWord method is called", () => {
    it("should return if the word length is between 1 and 2500", () => {
      expect(nearPalindromesDiv1.validateWord("a")).toBe(undefined);
    });

    it("should throw an error if the word length is less than 1", () => {
      expect(() => nearPalindromesDiv1.validateWord("")).toThrowError(
        "The word length must be between 1 and 2500"
      );
    });

    it("should throw an error if the word length is greater than 2500", () => {
      expect(() =>
        nearPalindromesDiv1.validateWord("a".repeat(2501))
      ).toThrowError("The word length must be between 1 and 2500");
    });

    it("should throw an error if the word does not contain lowercase English letters", () => {
      expect(() => nearPalindromesDiv1.validateWord("aA")).toThrowError(
        "The word must contain only lowercase English letters"
      );
    });
  });

  describe("When the resolveLetterPairsCount method is called", () => {
    it("should return a set of letter pairs", () => {
      const result = nearPalindromesDiv1.resolveLetterPairsCount("aabbc");
      expect(result).toEqual(
        new Map([
          ["a", 2],
          ["b", 2],
          ["c", 1],
        ])
      );
    });

    it("should return a set of letter pairs", () => {
      const result = nearPalindromesDiv1.resolveLetterPairsCount("a");
      expect(result).toEqual(new Map([["a", 1]]));
    });
  });

  describe("When the toBeNearPalindrome method is called", () => {
    it("should return 0 if the word is a near palindrome", () => {
      const result = nearPalindromesDiv1.toBeNearPalindrome("aabbc");
      expect(result).toBe(0);
    });

    it("should return 2 if the word needs 2 operations to be a a near palindrome", () => {
      const result = nearPalindromesDiv1.toBeNearPalindrome("aabbcccx");
      expect(result).toBe(1);
    });

    it("should return 4 as it needs 4 operations to be a near palindrome", () => {
      const result = nearPalindromesDiv1.toBeNearPalindrome("abcdefgh");
      expect(result).toBe(4);
    });


    it("should work with the challenge items", () => {
      const result = nearPalindromesDiv1.toBeNearPalindrome("daddy");
      expect(result).toBe(1);
    });

    it("should work with the challenge items", () => {
      const result = nearPalindromesDiv1.toBeNearPalindrome("axyzw");
      expect(result).toBe(2);
    });
  });
});
