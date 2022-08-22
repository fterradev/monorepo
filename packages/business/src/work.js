// const { calculate } = require("./long/way/from/office/calculations");

const { calculate } = require("shortcut/calculations");
const process = calculate;

/**
 * This also works.
 */
// const process = (value) => {
//     const { calculate } = require("shortcut/calculations");
//     return calculate(value);
// }

module.exports = {
    process,
};