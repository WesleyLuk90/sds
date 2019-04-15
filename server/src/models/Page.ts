import { Panel } from "./Panel";

export const PageSchema = `
type Page {
    id: ID!
    panels: [Panel!]!
}

input InputPage {
    id: ID!
    panels: [InputPanel!]!
}

`;

export interface Page {
    id: string;
    panels: Panel[];
}
