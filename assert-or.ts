// AssertResult type for type-safe error handling
export type AssertResult<T = never> =
  | { success: true; data: T }
  | { success: false; error: string };

export function Ok<T>(data: T): AssertResult<T> {
  return { success: true, data };
}

export function Err(error: string): AssertResult<false> {
  return { success: false, error };
}

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

export function assertOr<T>(
  value: T,
  errorMessage: string
): asserts value is NonNullable<T> {
  if (!value) {
    throw new AssertionError(errorMessage);
  }
}

interface AssertableMethod {
  (...args: any[]): AssertResult<any>;
}

export function HasAssertions() {
  return function <T extends AssertableMethod>(
    target: any,
    propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const method = descriptor.value!;

    descriptor.value = ((...args: any[]) => {
      try {
        return method.apply(target, args);
      } catch (error) {
        if (error instanceof AssertionError) {
          return Err(error.message);
        }
        throw error;
      }
    }) as T;
  };
}
