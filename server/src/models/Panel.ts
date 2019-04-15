export const PanelSchema = `
type Panel {
    id: ID!
    name: String!
    controls: [Control!]!
}

input InputPanel {
    id: ID!
    type: String!
    controls: [InputControl!]!
}

type Control {
    type: String!
    fieldId: String!
}

input InputControl {
    type: String!
    fieldId: String!
}
`;

export interface Panel {
    id: string;
    name: string;
    controls: Control[];
}

export interface Control {
    type: string;
    field: string;
}
