
export type FieldType = "text" | "checkbox"

export interface ICms {
    fields: ICmsField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>, data: any) => void;
}

export interface ICmsField {
    name: string;
    label?: string;
    type: FieldType;
    value: any;
    className?: string;
    optional?: boolean;
    placeholder?: string;
}

export interface ICmsComponents {
    textComponent?: (field: ICmsField) => JSX.Element;
}