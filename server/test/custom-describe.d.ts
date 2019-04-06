declare var describe: {
    (name: string, test: () => void): void;
    integration: (name: string, test: () => void) => void;
};
