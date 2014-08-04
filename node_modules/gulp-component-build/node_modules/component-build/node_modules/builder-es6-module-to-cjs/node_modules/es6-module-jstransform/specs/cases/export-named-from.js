export { x } from "./mod.js";
export { x, y } from "./mod.js";
export { x as y } from "./mod.js";
export { x as y, y as b } from "./mod.js";

export {
  x as y,
  a as b 
} from "./mod.js";

var x = "should be on 11th line";
