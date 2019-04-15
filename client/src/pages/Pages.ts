import { InputPage } from "../__generated__/globalTypes";

export class Pages {
    static createNew(): InputPage {
        return {
            id: "",
            panels: [
                {
                    id: "",
                    type: "",
                    controls: []
                }
            ]
        };
    }

    static update(page: InputPage, values: Partial<InputPage>) {
        return { ...page, ...values };
    }
}
