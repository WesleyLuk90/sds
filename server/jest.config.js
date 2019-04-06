module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/test/Setup.ts"],
    globals: {
        "ts-jest": {
            tsConfig: "<rootDir>/tsconfig.test.json"
        }
    }
};
