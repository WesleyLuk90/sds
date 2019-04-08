import * as React from "react";
import { InputDocumentValue, FieldType } from "../../__generated__/globalTypes";
import { DocumentField } from "../../system/requests/DocumentTypeRequests";
import { FieldEditorProps } from "./FieldEditorProps";
import { TextEditor } from "./TextEditor";
import { IdEditor } from "./IdEditor";
import { Documents } from "../Documents";
import { NumberEditor } from "./NumberEditor";
import { TagEditor } from "./TagEditor";

interface Props {
    value?: InputDocumentValue | null;
    field: DocumentField;
    onChange: (value: InputDocumentValue) => void;
}

const EDITORS: {
    [key in FieldType]: React.JSXElementConstructor<FieldEditorProps>
} = {
    id: IdEditor,
    text: TextEditor,
    number: NumberEditor,
    tags: TagEditor
};

export class DefaultFieldEditor extends React.Component<Props> {
    getValue() {
        if (this.props.value == null) {
            return Documents.newValue(this.props.field, {});
        } else {
            return this.props.value;
        }
    }

    render() {
        const Editor = EDITORS[this.props.field.type];
        const props: FieldEditorProps = {
            value: this.getValue(),
            field: this.props.field,
            onChange: this.props.onChange
        };
        return <Editor {...props} />;
    }
}
