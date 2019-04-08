import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import { Documents } from "../Documents";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import * as styles from "./TagEditor.css";
import FormControl from "@material-ui/core/FormControl";

interface State {
    value: string;
}

export class TagEditor extends React.Component<FieldEditorProps, State> {
    state: State = {
        value: ""
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };

    onDelete = (tag: string) => {
        this.props.onChange(
            Documents.newValue(this.props.field, {
                tags: this.props.value.tags.filter(t => t !== tag)
            })
        );
    };

    onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = this.state.value.trim();
        if (e.key === "Enter" && value !== "") {
            e.preventDefault();
            const next = new Set(this.props.value.tags);
            next.add(value);
            this.props.onChange(
                Documents.newValue(this.props.field, { tags: Array.from(next) })
            );
            this.setState({ value: "" });
        }
    };

    render() {
        return (
            <div>
                <InputLabel variant="outlined">
                    {this.props.field.name}
                </InputLabel>
                <div className={styles.input}>
                    {this.props.value.tags.map(t => (
                        <Chip
                            className={styles.chip}
                            key={t}
                            label={t}
                            onDelete={() => this.onDelete(t)}
                        />
                    ))}
                    <TextField
                        className={styles.textInput}
                        placeholder="Type a value then press enter..."
                        value={this.state.value}
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                    />
                </div>
            </div>
        );
    }
}
