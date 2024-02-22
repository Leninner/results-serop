/**
 * @Summary You have a bicycle lock.
 * The locking mechanism consists of several dials. Each dial contains the digits 0-9 in a cycle, in this order. From each dial exactly one digit is visible.
 * Each dial can be rotated in either direction:
 *
 * - Rotating the dial one step in the positive direction (denoted '+') increments the digit shown.
 * E.g., if the dial currently shows 4 and you make the '+' rotation, the dial will now show 5. After the digit 9 comes the digit 0 again.
 * - Rotating the dial one step in the negative direction (denoted '-') does the opposite.
 * E.g., the '-' rotation will change a dial showing 5 into a dial showing 4, and it will change a dial showing 0 into a dial showing 9.
 *
 * Your finger is currently on the leftmost dial.
 * - You can use it to rotate the dial it's on.
 * - You can also move your finger one dial to the right (denoted '&gt;') or one dial to the left (denoted '&lt;').
 * - You can only move your finger if the destination dial actually exists.
 * - You are given the int[] dials. The elements of dials are the digits currently shown on the dials of your lock, from the left to the right.
 * - You would like to scramble your lock into a state where all of the digits shown on the dials are mutually distinct.
 *
 * Find any sequence of at most 100 actions that accomplishes this goal, and return it as a String[].
 */

export class BicycleLock {
  MOVE_LEFT = "<";
  MOVE_RIGHT = ">";
  INCREMENT = "+";
  DECREMENT = "-";
  MAX_ACTIONS = 100;

  makeDistinct(dials) {
    this.validateDials(dials);
    if (this.isDialsAlreadyDistinct(dials)) {
      return 'No operations needed';
    }

    let cursor = 0;
    let actions = "";

    while (actions.length < this.MAX_ACTIONS) {
      if (this.isDialsAlreadyDistinct(dials)) {
        if (actions[actions.length - 1] === this.MOVE_RIGHT) {
          actions = actions.slice(0, -1);
        }

        break;
      }

      if (this.isUniqueInDials(dials[cursor], dials)) {
        cursor = this.moveCursorAndRotateDial(dials, cursor, this.MOVE_RIGHT);
        actions += this.MOVE_RIGHT;
        continue
      }

      const nearestMissingDial = this.resolveNearestMissingDial(dials, cursor);
      const aux = dials[cursor];
      dials[cursor] = nearestMissingDial;
      const quantityOfOperations = aux - nearestMissingDial;

      if (quantityOfOperations < 0) {
        actions += this.INCREMENT.repeat(Math.abs(quantityOfOperations));
      } else {
        actions += this.DECREMENT.repeat(quantityOfOperations);
      }

      cursor = this.moveCursorAndRotateDial(dials, cursor, this.MOVE_RIGHT);
      actions += this.MOVE_RIGHT;
    }

    return actions;
  }

  resolveNearestMissingDial(dials, cursor) {
    const POSIBLE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const dialsSet = new Set(dials);
    const missingLessThanCursor = POSIBLE_NUMBERS.filter(
      (number) => number < dials[cursor] && !dialsSet.has(number)
    );
    const missingGreaterThanCursor = POSIBLE_NUMBERS.filter(
      (number) => number > dials[cursor] && !dialsSet.has(number)
    );

    const maxMinNumber = Math.max(...missingLessThanCursor);
    const minMaxNumber = Math.min(...missingGreaterThanCursor);
    
    const diffWithMax = dials[cursor] - maxMinNumber;
    const diffWithMin = minMaxNumber - dials[cursor];

    return diffWithMax < diffWithMin ? maxMinNumber : minMaxNumber;
  }

  moveCursorAndRotateDial(dials, cursor, action) {
    if (action === this.MOVE_LEFT) {
      cursor = Math.max(0, cursor - 1);
    }

    if (action === this.MOVE_RIGHT) {
      cursor = Math.min(dials.length - 1, cursor + 1);
    }

    if (action === this.INCREMENT) {
      dials[cursor] = (dials[cursor] + 1) % 10;
    }

    if (action === this.DECREMENT) {
      dials[cursor] = (dials[cursor] + 9) % 10;
    }

    return cursor;
  }

  validateDials(dials) {
    if (!Array.isArray(dials)) {
      throw new Error("The dials must be an array");
    }

    if (dials.length === 0) {
      throw new Error("The dials array cannot be empty");
    }

    if (dials.length > 10) {
      throw new Error("The dials array cannot be more than 10 elements");
    }

    if (dials.some((dial) => isNaN(dial) || dial < 0 || dial > 9)) {
      throw new Error("The dials array must contain numbers between 0-9");
    }
  }

  isDialsAlreadyDistinct(dials) {
    return new Set(dials).size === dials.length;
  }

  isUniqueInDials(dial, dials) {
    const quantity = dials.filter((currentDial) => currentDial === dial).length;

    return quantity === 1;
  }
}
