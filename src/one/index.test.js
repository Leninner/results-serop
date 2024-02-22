import { expect, describe, it } from "vitest";
import { resolveWordByNumber, senirOpChallenge, validateNumber, validateNumber } from "./";
import { vi } from "vitest";

describe('When the resolveWordByNumber method is called', () => {
  it('should return a number if the number is not multiple of three or five', () => {
    const result = resolveWordByNumber(1);
    expect(result).toBe(1);
  });

  it('should return `Senir` if the number is multiple of three', () => {
    const result = resolveWordByNumber(3);
    expect(result).toBe('Senir');
  });

  it('should return `Op` if the number is multiple of five', () => {
    const result = resolveWordByNumber(5);
    expect(result).toBe('Op');
  });

  it('should return `Senir Op` if the number is multiple of three and five', () => {
    const result = resolveWordByNumber(15);
    expect(result).toBe('Senir Op');
  });
})

describe("When the validateNumber", () => {
  it('should be called with a number, otherwise it should throw an error', () => {
    expect(() => validateNumber()).toThrow('The argument must be a valid number');
    expect(() => validateNumber('Lenin')).toThrow();
    expect(() => validateNumber([])).toThrow();
    expect(() => validateNumber(NaN)).toThrow();
    expect(() => validateNumber(null)).toThrow();
    expect(() => validateNumber(undefined)).toThrow();
  })

  it('should be called with a number between 1 and 100, otherwise it should throw an error', () => {
    expect(() => validateNumber(0)).toThrow('The argument must be a number between 1 and 100');
    expect(() => validateNumber(101)).toThrow('The argument must be a number between 1 and 100');
  })
});
