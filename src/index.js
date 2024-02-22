import { senirOpChallenge } from "./one/index.js";
import { NearPalindromesDiv1 } from "./two/index.js";

console.log("**************** Running the first challenge ****************\n");

senirOpChallenge(25);

console.log("*************************************************************\n");

console.log("**************** Running the second challenge ****************\n");

const nearPalindromesDiv = new NearPalindromesDiv1();

console.log(nearPalindromesDiv.solve("aabbcc")); // 0
console.log(nearPalindromesDiv.solve("abc")); // 1
console.log(nearPalindromesDiv.solve("abcdefgh")); // 4

console.log("\n*************************************************************\n");

console.log("**************** Running the third challenge ****************\n");

senirOpChallenge(10);

console.log("*************************************************************\n");
