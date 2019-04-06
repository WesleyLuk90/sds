describe.integration = function(name, test) {
    if (process.env["TEST_PROFILE"] === "INTEGRATION") {
        describe(name, test);
    } else {
        describe(name, () => {
            it("skipped integration test", () => {});
        });
    }
};
