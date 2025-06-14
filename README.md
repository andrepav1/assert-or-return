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
import { assertOr, HasAssertions, AssertResult, Ok } from 'assert-or-return';

class Calculator {
  @HasAssertions()
  static add(a?: number, b?: number): AssertResult<number> {
    assertOr(a, "Parameter 'a' is required");
    assertOr(b, "Parameter 'b' is required");
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

### How It Works

1. **`assertOr(value, errorMessage)`** - Throws an assertion error if value is falsy
2. **`@HasAssertions()`** - Decorator that catches assertion errors and returns them as `AssertResult`
3. **`AssertResult<T>`** - Type-safe result type: `{ success: true, data: T }` or `{ success: false, error: string }`
4. **`Ok(value)`** - Helper to create success results

### Type Safety

The library provides full TypeScript support:

```typescript
// TypeScript knows the types after assertions
function processUser(user?: User): AssertResult<string> {
  assertOr(user, "User is required");
  assertOr(user.name, "User name is required");
  
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

### `assertOr<T>(value: T, errorMessage: string): asserts value is NonNullable<T>`

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

## License

MIT