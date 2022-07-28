
export interface ICms {
    fields: ICmsField[];
}

export interface ICmsField {
    name: string;
    label?: string;
    type: "string" | "boolean";
    value: any;
    className?: string;
    optional?: boolean;
    placeholder?: string;
}

export const types = {
    string: "text",
    boolean: "checkbox"
}