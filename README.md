# assert-or-return

Type-safe assertion library with decorator-based early returns for TypeScript.

## Installation

```bash
npm install assert-or-return
```

## Features

- 🎯 **Type-safe assertions** with TypeScript support
- 🔄 **Early returns** via decorators (no wrapper functions needed)
- 📦 **Result type** for explicit error handling
- ⚡ **Zero dependencies**
- 🛡️ **Full TypeScript support** with declaration files

## Usage

### Basic Example

```typescript
import { assert, HasAssertions, AssertResult, Ok, Err } from 'assert-or-return';

class Calculator {
  // With assert-or-return decorator (simplified)
  @HasAssertions()
  static add(a?: number, b?: number): AssertResult<number> {
    assert(a, "Parameter 'a' is required");
    assert(b, "Parameter 'b' is required");
    return Ok(a + b);
  }

  // Without decorator (manual error handling)
  static addWithoutAssertions(a?: number, b?: number): AssertResult<number> {
    if (!a) {
      return Err("Parameter 'a' is required");
    }
    if (!b) {
      return Err("Parameter 'b' is required");
    }
    return Ok(a + b);
  }
}

// Usage
const result1 = Calculator.add(1, 2);
if (result1.success) {
  console.log(result1.data); // 3
} else {
  console.log(result1.error); // Type-safe error handling
}

const result2 = Calculator.add(1); // Missing second parameter
console.log(result2); // { success: false, error: "Parameter 'b' is required" }
```

The decorator approach eliminates the need for manual `if` checks and `return Err()` statements, making your code more concise and readable.

### How It Works

1. **`assert(value, errorMessage)`** - Throws an assertion error if value is falsy
2. **`@HasAssertions()`** - Decorator that catches assertion errors and returns them as `AssertResult`
3. **`AssertResult<T>`** - Type-safe result type: `{ success: true, data: T }` or `{ success: false, error: string }`
4. **`Ok(value)`** - Helper to create success results

### Type Safety

The library provides full TypeScript support:

```typescript
// TypeScript knows the types after assertions
function processUser(user?: User): AssertResult<string> {
  assert(user, "User is required");
  assert(user.name, "User name is required");
  
  // TypeScript knows user and user.name are non-null here
  return Ok(`Hello ${user.name}!`);
}
```

## Requirements

- **Node.js**: >=16.0.0
- **TypeScript**: For full type safety (optional for JavaScript usage)
- **Decorators**: Your tsconfig.json must have `"experimentalDecorators": true`

## TypeScript Configuration

Add these options to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## API Reference

### `assert<T>(value: T, errorMessage: string): asserts value is NonNullable<T>`

Asserts that a value is truthy. If the assertion fails, throws an error that gets caught by the `@HasAssertions()` decorator.

### `@HasAssertions()`

Class method decorator that catches assertion errors and converts them to `AssertResult` return values.

### `AssertResult<T>`

Type representing either success or failure:
- `{ success: true, data: T }` - Successful result with data
- `{ success: false, error: string }` - Failed result with error message

### `Ok<T>(data: T): AssertResult<T>`

Helper function to create successful results.

### `Err(error: string): AssertResult<never>`

Helper function to create error results.

## Limitations

### Decorator Scope

The `@HasAssertions()` decorator **only works on class methods**. It cannot be used on:
- Standalone functions
- Arrow functions
- Object methods (outside of classes)

```typescript
// ✅ Works - class method
class MyClass {
  @HasAssertions()
  static myMethod(): AssertResult<string> {
    assert(someValue, "Error message");
    return Ok("success");
  }
}

// ❌ Doesn't work - standalone function
@HasAssertions() // This won't work
function myFunction(): AssertResult<string> {
  assert(someValue, "Error message");
  return Ok("success");
}
```

### Behavior Without Decorator

When `assert()` is used **without** the `@HasAssertions()` decorator, it behaves like Node.js's built-in `assert` module - it simply throws an `AssertionError` that you must catch yourself:

```typescript
import { assert } from 'assert-or-return';

function withoutDecorator(value?: string) {
  try {
    assert(value, "Value is required"); // Throws AssertionError if value is falsy
    console.log("Value is:", value);
  } catch (error) {
    console.log("Caught error:", error.message); // Manual error handling required
  }
}
```

This behavior is consistent with Node.js's `node:assert` module, making the library familiar to developers already using assertions.

## License

MIT