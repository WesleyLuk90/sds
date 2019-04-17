import { InputPage, InputPanel } from "../__generated__/globalTypes";
import { Panels } from "./Panels";

export class Pages {
    static createNew(): InputPage {
        return {
            id: "",
            panels: [Panels.newPanel()]
        };
    }

    static addPanel(page: InputPage) {
        return Pages.update(page, {
            panels: [...page.panels, Panels.newPanel()]
        });
    }

    static updatePanel(
        page: InputPage,
        oldPanel: InputPanel,
        newPanel: InputPanel
    ) {
        return Pages.update(page, {
            panels: page.panels.map(p => (p === oldPanel ? newPanel : p))
        });
    }

    static update(page: InputPage, values: Partial<InputPage>) {
        return { ...page, ...values };
    }
}
