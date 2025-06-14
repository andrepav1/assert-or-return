import { assertOr, HasAssertions, AssertResult, Ok } from "./assert-or";

class Calculator {
  @HasAssertions()
  static add(a?: number, b?: number): AssertResult<number> {
    assertOr(a, "Parameter 'a' is required");
    assertOr(b, "Parameter 'b' is required");
    return Ok(a + b);
  }

  @HasAssertions()
  static subtract(a: number, b?: number): AssertResult<number> {
    assertOr(a, "Parameter 'a' is required");
    assertOr(b, "Parameter 'b' is required");
    return Ok(a - b);
  }
}

// Usage examples
const result1 = Calculator.add(1, 2);
console.log(
  "add(1, 2):",
  result1.success === true ? result1.data : result1.error
); // { success: true, data: 3 }

const result2 = Calculator.add(1);
console.log("add(1):", result2.success === true ? result2.data : result2.error); // { success: false, error: "Parameter 'b' is required" }

const result3 = Calculator.add();
console.log("add():", result3.success === true ? result3.data : result3.error); // { success: false, error: "Parameter 'a' is required" }
