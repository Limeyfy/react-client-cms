import React from "react";

export type FieldType = "text" | "checkbox" | "number" | "password" | "email" | "image" | "images" | "array" | "object";

export interface ICms {
    fields: ICmsField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>, data: any) => void;
    className?: string;
    formOptions?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    errorHandling?: ICmsErrorHandling;
}

export interface ICmsField {
    name: string;
    label?: string;
    type: FieldType;
    value?: any;
    className?: string;
    optional?: boolean;
    placeholder?: string;
    options?: ICmsFieldOptions;
    of?: "object" | "string";
    fields?: ICmsFieldField[];
}

export interface ICmsFieldField {
    name: string;
    label?: string;
    type: "text" | "checkbox" | "number" | "password" | "email" | "image";
    value?: any;
    className?: string;
    optional?: boolean;
    placeholder?: string;
    options?: ICmsFieldOptions;
}

export interface ICmsErrorHandling {
    onError?: (message: string, code: number) => void;
}

export interface ICmsFieldOptions {
    text?: string; // text for components with extra text like the image component
    maxImageSize?: number; // in Bytes
}

export interface ICmsComponents {
    text?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    password?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    email?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    number?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    checkbox?: (field: ICmsField, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element;
    image?: (field: ICmsField, onChange: (file: File) => void) => JSX.Element;
    images?: (field: ICmsField, onChange: (files: File[]) => void) => JSX.Element;
}

/*
    Error codes
    1001: File too large
    1002: File type not allowed
    1003: File not found
*/