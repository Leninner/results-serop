import { it, describe, assert } from "vitest";
import { BicycleLock } from ".";
import { expect } from "vitest";

describe("BicycleLock tests", () => {
  const bicycleLock = new BicycleLock();

  describe("When the validateDials method is called", () => {
    it("should throw an error if the dials is not an array", () => {
      expect(() => bicycleLock.validateDials("")).toThrowError(
        "The dials must be an array"
      );
      expect(() => bicycleLock.validateDials([])).toThrowError(
        "The dials array cannot be empty"
      );
      expect(() => bicycleLock.validateDials(NaN)).toThrowError(
        "The dials must be an array"
      );
    });

    it("should throw an error if the dials array is more than 10 elements", () => {
      expect(() =>
        bicycleLock.validateDials([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1])
      ).toThrowError("The dials array cannot be more than 10 elements");
    });

    it("should throw an error if the elements of the dials array are not numbers and are not in the range of 0-9", () => {
      expect(() =>
        bicycleLock.validateDials([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      ).toThrowError("The dials array must contain numbers between 0-9");
    });
  });

  describe("When the isDialsAlreadyDistinct method is called", () => {
    it("should return true if all the elements of the dials array are distinct", () => {
      expect(bicycleLock.isDialsAlreadyDistinct([1, 2, 3, 4, 5])).toBe(true);
    });

    it("should return false if all the elements of the dials array are not distinct", () => {
      expect(bicycleLock.isDialsAlreadyDistinct([1, 2, 3, 4, 5, 1])).toBe(
        false
      );
    });
  });

  describe("When the isUniqueInDials method is called", () => {
    it("should return true if the dial is unique in the dials array", () => {
      expect(bicycleLock.isUniqueInDials(2, [2, 3, 4, 5])).toBe(true);
    });

    it("should return false if the dial is not unique in the dials array", () => {
      expect(bicycleLock.isUniqueInDials(1, [1, 3, 4, 5, 1])).toBe(false);
    });

    it("should return false if the dial is not unique in the dials array", () => {
      expect(bicycleLock.isUniqueInDials(8, [8, 8, 0, 9])).toBe(false);
    });
  });

  describe("When the moveCursorAndRotateDial method is called", () => {
    it("should move the cursor to the left", () => {
      const dials = [1, 2, 3, 4, 5];
      let cursor = 3;
      cursor = bicycleLock.moveCursorAndRotateDial(
        dials,
        cursor,
        bicycleLock.MOVE_LEFT
      );
      expect(cursor).toBe(2);
    });

    it("should move the cursor to the right", () => {
      const dials = [1, 2, 3, 4, 5];
      let cursor = 3;
      cursor = bicycleLock.moveCursorAndRotateDial(
        dials,
        cursor,
        bicycleLock.MOVE_RIGHT
      );
      expect(cursor).toBe(4);
    });

    it("should increment the dial", () => {
      const dials = [1, 2, 3, 4, 5];
      let cursor = 3;
      cursor = bicycleLock.moveCursorAndRotateDial(
        dials,
        cursor,
        bicycleLock.INCREMENT
      );
      expect(dials).toEqual([1, 2, 3, 5, 5]);
    });

    it("should decrement the dial", () => {
      const dials = [1, 2, 3, 4, 5];
      let cursor = 3;
      cursor = bicycleLock.moveCursorAndRotateDial(
        dials,
        cursor,
        bicycleLock.DECREMENT
      );
      expect(dials).toEqual([1, 2, 3, 3, 5]);
    });

    it("if the number is 9, it should be 0 when incremented", () => {
      const dials = [1, 2, 3, 9, 5];
      let cursor = 3;
      cursor = bicycleLock.moveCursorAndRotateDial(
        dials,
        cursor,
        bicycleLock.INCREMENT
      );
      expect(dials).toEqual([1, 2, 3, 0, 5]);
    });

    it("if the number is 0, it should be 9 when decremented", () => {
      const dials = [1, 2, 3, 0, 5];
      let cursor = 3;
      cursor = bicycleLock.moveCursorAndRotateDial(
        dials,
        cursor,
        bicycleLock.DECREMENT
      );
      expect(dials).toEqual([1, 2, 3, 9, 5]);
    });
  });

  describe("When the resolveNearestMissingDial method is called", () => {
    it("should return a missing dial in the dials array", () => {
      const result = bicycleLock.resolveNearestMissingDial([8, 8, 8, 8], 0);
      assert.oneOf(result, [7, 9], "Not found in list");
    });

    it("should return a missing dial in the dials array", () => {
      const result = bicycleLock.resolveNearestMissingDial([7, 8, 8, 8], 1);
      expect(result).toBe(9);
    });

    it("should return a missing dial in the dials array", () => {
      const result = bicycleLock.resolveNearestMissingDial([8, 8, 8, 9], 0);
      expect(result).toBe(7);
    });

    it("should return a missing dial in the dials array", () => {
      const result = bicycleLock.resolveNearestMissingDial([8, 7, 6, 9], 3);
      expect(result).toBe(5);
    });

    it("should return a missing dial in the dials array", () => {
      const result = bicycleLock.resolveNearestMissingDial(
        [1, 1, 1, 1, 1, 2, 5, 8],
        3
      );
      expect(result).toBe(0);
    });
  });

  describe("When the makeDistinct method is called", () => {
    it("should return - when the input [8, 8, 0, 9]", () => {
      const result = bicycleLock.makeDistinct([8, 8, 0, 9]);
      expect(result).toBe("-");
    });

    it("should return ->-- when the input [8, 8, 0, 9]", () => {
      const result = bicycleLock.makeDistinct([8, 8, 0, 9]);
      expect(result).toBe("-");
    });

    it("should return +++>>++++ when the input [0, 1, 0, 2, 0]", () => {
      const result = bicycleLock.makeDistinct([0, 1, 0, 2, 0]);
      expect(result).toBe("+++>>++++");
    });

    it("should return +++>>++++ when the input [0, 1, 0, 2, 0]", () => {
      const result = bicycleLock.makeDistinct([0, 1, 0, 2, 0]);
      expect(result).toBe("+++>>++++");
    });

    it("should return >->>++>>>++++>++++++++ when the input [3, 7, 8 , 2 , 2, 0, 1, 1, 1, 7]", () => {
      const result = bicycleLock.makeDistinct([3, 7, 8, 2, 2, 0, 1, 1, 1, 7]);

      expect(result).toBe(">->>++>>>++++>++++++++");
    });
  });
});
