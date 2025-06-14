"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_or_1 = require("./assert-or");
function test(a, b) {
    (0, assert_or_1.assertOr)(a, "a is required", 0);
    (0, assert_or_1.assertOr)(b, "b is required", 0);
    return a + b;
}
console.log("test(1, 2):", test(1, 2)); // 3
console.log("test(1):", test(1)); // -1 (fallback from decorator)
console.log("test():", test()); // -1 (fallback from decorator)
