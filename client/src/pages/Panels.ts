import { InputPanel } from "../__generated__/globalTypes";

export class Panels {
    static newPanel(): InputPanel {
        return {
            id: "",
            type: "",
            controls: []
        };
    }

    static setType(inputPanel: InputPanel, type: string): InputPanel {
        return this.update(inputPanel, { type });
    }

    static update(
        inputPanel: InputPanel,
        values: Partial<InputPanel>
    ): InputPanel {
        return { ...inputPanel, ...values };
    }
}
