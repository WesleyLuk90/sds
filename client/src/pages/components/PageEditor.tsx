import * as React from "react";
import { TextInput } from "../../components/forms/TextInput";
import { InputPage } from "../../__generated__/globalTypes";
import { Pages } from "../Pages";

interface Props {
    page: InputPage;
    onChange: (page: InputPage) => void;
}

export class PageEditor extends React.Component<Props> {
    onChangeId = (id: string) => {
        this.props.onChange(Pages.update(this.props.page, { id }));
    };

    render() {
        return (
            <div>
                <TextInput
                    label="Page slug"
                    value={this.props.page.id}
                    onChange={this.onChangeId}
                />
            </div>
        );
    }
}
