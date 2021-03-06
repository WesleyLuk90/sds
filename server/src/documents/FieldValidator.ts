const ID_REGEX = /^[a-z][a-z0-9-]{3,}$/;

export class FieldValidator {
    static validId(id: string): boolean {
        return ID_REGEX.test(id);
    }

    static validateId(id: string) {
        if (id === "") {
            throw new Error("ID must not be empty");
        }
        if (!FieldValidator.validId(id)) {
            throw new Error(`Invalid ID '${id}'`);
        }
    }
}
