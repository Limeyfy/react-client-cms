import { InputNumberProps, SelectProps, UploadFile, UploadProps } from "antd";
import { Rule } from "antd/lib/form";
import { TextAreaProps } from "antd/lib/input";

export interface IClientCms<T = any> {
    onSubmit?: (data: T) => void | Promise<any>;
    fields: IClientCmsField[];
    className?: string;
    submitButton?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    loading?: boolean;
    name?: string;
    onFailed?: (error: any) => void;
}

export interface IClientCmsField {
    name: string;
    label?: string;
    type: IClientCmsDefaultType | IClientCmsTextAreaType | IClientCmsNumberType | IClientCmsSelectType | IClientCmsUploadType;
    defaultValue?: any;
    rules?: Rule[];
    required?: boolean;
    className?: string;
    id?: string;
}

export type IClientCmsDefaultType = {
    type: "string" | "boolean" | "date";
    props?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
}

export type IClientCmsTextAreaType = {
    type: "text";
    props?: TextAreaProps;
}

export type IClientCmsNumberType = {
    type: "number";
    props?: InputNumberProps;
}

export type IClientCmsSelectType = {
    type: "select";
    options: any[];
    onChange?: (value: any) => void;
    defaultValue?: any;
    getIdentify?: (value: any) => string;
    getLabel?: (value: any) => string;
    props?: SelectProps;
}

export type IClientCmsUploadType = {
    type: "upload";
    props?: UploadProps;
    onChange?: (value: UploadFile<any>[]) => any;
}