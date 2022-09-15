import { ControllerProps } from "react-hook-form";

export interface IClientCms<T> {
    onSubmit?: (data: T) => void;
    fields: IClientCmsField<T>[];
    className?: string;
    submitButton?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    loading?: boolean;
    name?: string;
}

export type IClientCmsField<T> = IClientCmsTextField<T> | IClientCmsSelectField<T>;

export interface IClientCmsTextField<T = any> extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> {

    name: Extract<keyof T, string>;
    label: string;
    type?: "text" | "number" | "email" | "password" | "number" | "date" | "time" | "datetime-local" | "color" | "file";
    rules?: ControllerProps["rules"];
}

export interface IClientCmsSelectField<T> {
    name: Extract<keyof T, string>;
    label: string;
    type: "select";
    options: T[];
    renderLabel: (option: T) => React.ReactNode | string;
    renderValue: (option: T) => string;
    onChange?: (option: T) => any;
    defaultValue?: T;
    rules?: ControllerProps["rules"];
}