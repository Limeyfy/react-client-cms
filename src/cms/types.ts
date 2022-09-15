import { ControllerProps } from "react-hook-form"

export interface IClientCms<T> {
    onSubmit?: (data: T) => void;
    fields: IClientCmsField<T>[];
    className?: string;
    submitButton?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    loading?: boolean;
    name?: string;
}

export type IClientCmsField<T> = IClientCmsTextField<T>;

export interface IClientCmsTextField<T> extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "text" | "number" | "email" | "password" | "number" | "date" | "time" | "datetime-local" | "month" | "week" | "url" | "tel" | "color";
    rules?: ControllerProps["rules"];
}
