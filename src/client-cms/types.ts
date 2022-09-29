import { ControllerProps } from 'react-hook-form';
import React from 'react';

export interface IClientCms<T> {
  onSubmit?: (data: T) => void;
  fields: IClientCmsField<T>[];
  className?: string;
  submitButton?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  loading?: boolean;
  name?: string;
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
  | 'color'
  rules?: ControllerProps['rules'];
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
  rules?: ControllerProps['rules'];
}

export interface IClientCmsSelectField<T> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'select';
  options: any[];
  renderLabel: (option: any) => React.ReactNode | string;
  onChange?: (option: any) => any;
  defaultValue?: any;
  rules?: ControllerProps['rules'];
  nullValueText?: string;
  disabled?: boolean;
}

export interface IClientCmsTextAreaField<T = any>
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: Extract<keyof T, string>;
  label?: string;
  type: "text";
  rules?: ControllerProps['rules'];
}

export interface IClientCmsFileField<T = any>
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'file';
  rules?: ControllerProps['rules'];
  beforeUpload?: (file: File) => boolean;
  disabled?: boolean;
}

export interface IClientCmsObjectField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'object';
  fields: IClientCmsSimpleField<T>[];
}

export interface IClientCmsArrayField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'array';
  arrayType: 'string' | 'number';
  defaultValue?: (string | number)[];
  onChange?: (data: string | number) => string | number;
  renderLabel?: (data: string | number) => React.ReactNode | string;
}

export interface IClientCmsObjectArrayField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'object-array';
  fields: IClientCmsSimpleField<any>[];
  defaultValue?: any[];
  onChange?: (data: any) => any;
  renderLabel?: (data: any) => React.ReactNode | string;
  options?: {
    showItemIndex?: boolean;
  }
}