export function checkNotNull<T>(
    value: T | null | undefined,
    message?: string
): T {
    if (value == null) {
        throw new Error(message || `Null error ${value}`);
    }
    return value;
}
