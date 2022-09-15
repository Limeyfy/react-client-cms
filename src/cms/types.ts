import { InputNumberProps, SelectProps, UploadFile, UploadProps } from "antd";
import { InputProps, TextAreaProps } from "antd/lib/input";
import { Moment } from "moment";

export interface IClientCms<T> {
    onSubmit?: (data: T) => void;
    fields: IClientCmsField<T>[];
    className?: string;
    submitButton?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    loading?: boolean;
    name?: string;
    noClassOverride?: boolean;
}

export type IClientCmsField<T> = IClientCmsDefaultType<T> | IClientCmsBooleanType<T> | IClientCmsNumberType<T> | IClientCmsSelectType<T> | IClientCmsUploadType<T> | IClientCmsDateType<T> | IClientCmsTextAreaType<T>;

export type IClientCmsDefaultType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "string" | "color";
    props?: ICCInputProps;
    initValue?: string;
    onChange?: (str: string) => any;
    className?: string;
    id?: string;
}

export type IClientCmsBooleanType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "boolean";
    props?: ICCInputCheckboxProps;
    initValue?: boolean;
    onChange?: (bool: boolean) => any;
    className?: string;
    id?: string;
}

export type IClientCmsDateType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "date";
    props?: ICCInputProps;
    initValue?: Moment;
    onChange?: (str: string) => any;
    className?: string;
    id?: string;
}


export type IClientCmsTextAreaType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "text";
    props?: ICCTextAreaProps;
    initValue?: string;
    onChange?: (str: string) => any;
    className?: string;
    id?: string;
}

export type IClientCmsNumberType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "number";
    initValue?: string;
    props?: ICCInputNumberProps;
    onChange?: (str: string | number) => any;
    className?: string;
    id?: string;
}

export type IClientCmsSelectType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "select";
    options: any[];
    onChange?: (value: any) => any;
    initValue?: string | boolean;
    getIdentify?: (value: any) => string;
    getLabel?: (value: any) => string;
    props?: ICCSelectProps;
    className?: string;
    id?: string;
}

export type IClientCmsUploadType<T> = {
    name: Extract<keyof T, string>;
    label?: string;
    type?: "upload";
    initValue?: {
        uid: string;
        name: string;
        status: string;
        url: string;
    }[]
    props?: ICCUploadProps;
    onChange?: (value: UploadFile<any>[]) => any;
    className?: string;
    id?: string;
}

// Types :O
export type ICCSelectProps = Omit<SelectProps, "defaultValue" | "onChange">
export type ICCTextAreaProps = Omit<TextAreaProps, "defaultValue" | "onChange">
export type ICCInputNumberProps = Omit<InputNumberProps, "defaultValue" | "onChange">
export type ICCUploadProps = Omit<UploadProps, "defaultFileList" | "onChange">
export type ICCInputProps = Omit<InputProps, "defaultValue" | "onChange">
export type ICCInputCheckboxProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "defaultValue" | "onChange" | "value">