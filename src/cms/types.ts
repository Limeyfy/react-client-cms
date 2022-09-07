import { TextAreaProps } from "antd/lib/input";

export interface IClientCms<T = unknown> {
    onSubmit?: (data: T) => void | Promise<unknown>;
    fields: IClientCmsField[];
    className?: string;
    submitButton?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    loading?: boolean;
}

export interface IClientCmsField {
    name: string;
    label?: string;
    type: IClientCmsDefaultType | IClientCmsTextAreaType;
}

export type IClientCmsDefaultType = {
    type: "string" | "number" | "boolean" | "date";
    props?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
}

export type IClientCmsTextAreaType = {
    type: "text";
    props?: TextAreaProps;
}
