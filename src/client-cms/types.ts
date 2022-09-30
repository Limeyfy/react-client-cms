import React from 'react';

export interface IClientCms<T> {
  onSubmit?: (data: T) => void;
  fields: IClientCmsField<T>[];
  className?: string;
  bottomElement?: ((props: { loading: boolean, data: T }) => React.ReactNode) | (() => React.ReactNode);
  loading?: boolean;
  name?: string;
  logErrors?: boolean;
}

export type IClientCmsField<T> =
  | IClientCmsStringField<T>
  | IClientCmsSelectField<T>
  | IClientCmsFileField<T>
  | IClientCmsObjectField<T>
  | IClientCmsArrayField<T>
  | IClientCmsTextAreaField<T>
  | IClientCmsObjectArrayField<T>
  | IClientCmsBooleanField<T>;

export type IClientCmsSimpleField<T> =
  | IClientCmsStringField<T>
  | IClientCmsSelectField<T>
  | IClientCmsFileField<T>
  | IClientCmsTextAreaField<T>
  | IClientCmsBooleanField<T>;

export interface IClientCmsStringField<T = any>
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: Extract<keyof T, string>;
  label?: string;
  type?:
  | 'string'
  | 'number'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'color';
  validate?: IClientCmsValidate<string>;
}

export interface IClientCmsBooleanField<T = any>
  extends Omit<React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >, "defaultValue"> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'boolean';
  defaultValue?: boolean;
  validate?: IClientCmsValidate<boolean>;
}

export interface IClientCmsSelectField<T> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'select';
  options: any[];
  renderLabel: (option: any) => React.ReactNode | string;
  onChange?: (option: any) => any;
  defaultValue?: any;
  nullValueText?: string;
  disabled?: boolean;
  validate?: IClientCmsValidate<any>;
}

export interface IClientCmsTextAreaField<T = any>
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: Extract<keyof T, string>;
  label?: string;
  type: "text";
  validate?: IClientCmsValidate<string>;
}

export interface IClientCmsFileField<T = any>
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'file';
  validate?: IClientCmsValidate<File>;
  disabled?: boolean;
}

export interface IClientCmsObjectField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'object';
  fields: IClientCmsSimpleField<T>[];
  disabled?: boolean;
  validate?: IClientCmsValidate<any>;
}

export interface IClientCmsArrayField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'array';
  of: 'string' | 'number';
  defaultValue?: (string | number)[];
  onChange?: (data: string | number) => string | number;
  renderLabel?: (data: string | number) => React.ReactNode | string;
  disabled?: boolean;
  validate?: IClientCmsValidate<(string | number)[]>;
}

export interface IClientCmsObjectArrayField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'object-array';
  fields: IClientCmsSimpleField<any>[];
  defaultValue?: any[];
  onChange?: (data: any) => any;
  renderLabel?: (data: any) => React.ReactNode | string;
  disabled?: boolean;
  options?: {
    showItemIndex?: boolean;
  }
  validate?: IClientCmsValidate<any[]>;
}


export type IClientCmsValidate<T> = (data: T) => boolean | {
  error?: string;
}

export type FieldError = {
  id: string;
  type: string;
  message: string;
}