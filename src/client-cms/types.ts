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
  | IClientCmsObjectArrayField<T>;

export type IClientCmsSimpleField<T> =
  | IClientCmsStringField<T>
  | IClientCmsSelectField<T>
  | IClientCmsFileField<T>
  | IClientCmsTextAreaField<T>;

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
  | 'boolean';
  rules?: ControllerProps['rules'];
}

export interface IClientCmsSelectField<T> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'select';
  options: T[];
  renderLabel: (option: T) => React.ReactNode | string;
  onChange?: (option: T) => any;
  defaultValue?: T;
  rules?: ControllerProps['rules'];
  nullValueText?: string;
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
}

export interface IClientCmsObjectArrayField<T = any> {
  name: Extract<keyof T, string>;
  label?: string;
  type: 'object-array';
  fields: IClientCmsSimpleField<T>[];
  defaultValue?: T[];
  onChange?: (data: T) => T;
  renderLabel?: (data: T) => React.ReactNode | string;
  options?: {
    showItemIndex?: boolean;
  }
}