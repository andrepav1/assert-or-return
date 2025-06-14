"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertOr = assertOr;
exports.HasAssertions = HasAssertions;
class AssertionError extends Error {
    constructor(message, fallbackValue) {
        super(message);
        this.fallbackValue = fallbackValue;
        this.name = 'AssertionError';
    }
}
function assertOr(value, message, fallbackValue) {
    if (!value) {
        throw new AssertionError(message, fallbackValue);
    }
}
function HasAssertions(fallbackValue) {
    return function (target, propertyName, descriptor) {
        const method = descriptor.value;
        descriptor.value = ((...args) => {
            try {
                return method.apply(target, args);
            }
            catch (error) {
                if (error instanceof AssertionError) {
                    return error.fallbackValue ?? fallbackValue;
                }
                throw error;
            }
        });
    };
}
