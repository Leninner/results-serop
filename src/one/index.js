/**
 * @summary Write a program that prints the numbers from 1 to 100.
 * - For multiples of three, print the word “Senir” instead of the number.
 * - For multiples of five, print the word “Op” instead of the number.
 * - For numbers which are multiples of both three and five, print “Senir Op” instead of the number.
 *
 * @param {number} target - A number from 1 to 100
 * @returns {string} - A string that is either the number, "Senir", "Op", or "Senir Op"
 */

export const validateNumber = (number) => {
  if (typeof number !== "number" || isNaN(number))
    throw new Error("The argument must be a number");
  if (number < 1 || number > 100)
    throw new Error("The argument must be a number between 1 and 100");
};

export const resolveWordByNumber = (number) => {
  let result = "";

  if (number % 3 === 0) result += "Senir";
  if (number % 5 === 0) result += " Op";

  return result.trim() || number;
};

export const senirOpChallenge = (target) => {
  validateNumber(target);

  for (let i = 1; i <= target; i++) {
    console.log(resolveWordByNumber(i));
  }
};
