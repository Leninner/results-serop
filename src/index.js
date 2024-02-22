import { senirOpChallenge } from "./one/index.js";
import { BicycleLock } from "./three/index.js";
import { NearPalindromesDiv1 } from "./two/index.js";

console.log("**************** Running the first challenge ****************\n");

senirOpChallenge(25);

console.log("*************************************************************\n");

console.log("**************** Running the second challenge ****************\n");

const nearPalindromesDiv = new NearPalindromesDiv1();

console.log(nearPalindromesDiv.solve("aabbcc")); // 0
console.log(nearPalindromesDiv.solve("abc")); // 1
console.log(nearPalindromesDiv.solve("abcdefgh")); // 4

console.log(
  "\n*************************************************************\n"
);

console.log("**************** Running the third challenge ****************\n");

const bicycleLock = new BicycleLock();
console.log(bicycleLock.makeDistinct([1, 2, 3, 4, 5])); // 0
console.log(bicycleLock.makeDistinct([3, 7, 8, 2, 2, 0, 1, 1, 1, 7]));

console.log("*************************************************************\n");
