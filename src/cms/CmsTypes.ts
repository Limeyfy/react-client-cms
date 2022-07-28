import React from "react";

export type FieldType = "text" | "checkbox" | "number" | "password" | "email";

export interface ICms {
    fields: ICmsField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>, data: any) => void;
    className?: string;
    formOptions?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
}

export interface ICmsField {
    name: string;
    label?: string;
    type: FieldType;
    value?: any;
    className?: string;
    optional?: boolean;
    placeholder?: string;
}

export interface ICmsComponents {
    text?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    number?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    checkbox?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
}