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
}

export interface IClientCmsField<T> {
    name: Extract<keyof T, string>;
    label?: string;
    type: IClientCmsDefaultType | IClientCmsBooleanType | IClientCmsNumberType | IClientCmsSelectType | IClientCmsUploadType | IClientCmsDateType | IClientCmsTextAreaType;
    required?: boolean;
    className?: string;
    id?: string;
}

export type IClientCmsDefaultType = {
    type: "string";
    props?: ICCInputProps;
    initValue?: string | boolean;
    onChange?: (str: string) => any;
}

export type IClientCmsBooleanType = {
    type: "boolean";
    props?: ICCInputCheckboxProps;
    initValue?: boolean;
    onChange?: (bool: boolean) => any;
}

export type IClientCmsDateType = {
    type: "date";
    props?: ICCInputProps;
    initValue?: Moment;
    onChange?: (date: Moment) => any;
}


export type IClientCmsTextAreaType = {
    type: "text";
    props?: ICCTextAreaProps;
    initValue?: string;
    onChange?: (str: string) => any;
}

export type IClientCmsNumberType = {
    type: "number";
    initValue?: string;
    props?: ICCInputNumberProps;
    onChange?: (str: string | number) => any;
}

export type IClientCmsSelectType = {
    type: "select";
    options: any[];
    onChange?: (value: any) => any;
    initValue?: string | boolean;
    getIdentify?: (value: any) => string;
    getLabel?: (value: any) => string;
    props?: ICCSelectProps;
}

export type IClientCmsUploadType = {
    type: "upload";
    initValue?: {
        uid: string;
        name: string;
        status: string;
        url: string;
    }[]
    props?: ICCUploadProps;
    onChange?: (value: UploadFile<any>[]) => any;
}

// Types :O
export type ICCSelectProps = Omit<SelectProps, "defaultValue" | "onChange">
export type ICCTextAreaProps = Omit<TextAreaProps, "defaultValue" | "onChange">
export type ICCInputNumberProps = Omit<InputNumberProps, "defaultValue" | "onChange">
export type ICCUploadProps = Omit<UploadProps, "defaultFileList" | "onChange">
export type ICCInputProps = Omit<InputProps, "defaultValue" | "onChange">
export type ICCInputCheckboxProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "defaultValue" | "onChange" | "value">