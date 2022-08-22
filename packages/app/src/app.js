const mystical = require("shortcut/mystical");
const { process } = require("@monorepo/business");
console.log("home");
console.log(mystical("mug"));
const processInput = 1;
console.log(`result of processing value ${processInput}: ${process(processInput)}`);
const ride = require("shortcut/forest");
ride();