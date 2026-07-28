/*
 * Brand checks, used wherever a value's kind decides how it gets interpreted.
 *
 * Object.prototype.toString reads an object's internal slot, which makes these
 * realm-independent where `instanceof` is not. A Date built in an iframe, in
 * another document's <script>, or in a Node vm context comes from a different
 * Date constructor, so `foreignDate instanceof Date` is false even though the
 * value is every bit a Date. JDate's constructor branches on exactly that
 * distinction, and both ways of getting it wrong are silent: a foreign Date
 * read as a config leaves the constructor returning today, and one that misses
 * every branch throws "Unexpected input" for a perfectly good date.
 *
 * Array.isArray needs no equivalent — it is specified to see across realms
 * already.
 *
 * This lives in its own module rather than in helpers.js so that config.js can
 * use it too: helpers.js imports the default config, so config.js importing
 * back out of helpers.js would be a cycle.
 */

const brand = (value) => Object.prototype.toString.call(value);

export const isDate = (value) => brand(value) === '[object Date]';

/*
 * Object literals and class instances, but not Arrays, Dates, Maps, or any
 * other exotic object that carries its own toString tag.
 */
export const isPlainObject = (value) => brand(value) === '[object Object]';
