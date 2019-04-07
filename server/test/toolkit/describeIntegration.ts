export function describeIntegration(name: string, test: () => void) {
    if (process.env["TEST_PROFILE"] === "INTEGRATION" || process.env["CI"]) {
        describe(name, test);
    } else {
        describe(name, () => {
            it("skipped integration test", () => {});
        });
    }
}
