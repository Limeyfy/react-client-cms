import React from 'react';
import { CheckBox, FileInput, SelectComponent, TextInput } from '../components';
import ArrayComponent from '../components/ArrayComponent';
import ObjectArrayComponent from '../components/ObjectArrayComponent';
import TextComponent from '../components/TextComponent';
import { unPascalCase } from '../func/textHelper';
import {
  IClientCmsArrayField,
  IClientCmsObjectArrayField,
  IClientCmsSimpleField,
} from './types';

export const Component = <T,>(
  field:
    | IClientCmsSimpleField<T>
    | IClientCmsArrayField<T>
    | IClientCmsObjectArrayField<T>,
  onChange: (value: any) => void,
  value: any,
  error?: {
    type: string;
    message?: string;
  }
) => {
  const { defaultValue, ...restField } = field;
  switch (field.type) {
    case 'file':
      const { value: _, defaultValue, ...rest } = field;
      return (
        <FileInput
          onChange={e => e.target.files && onChange(e.target.files)}
          {...rest}
          files={value}
        />
      );

    case 'select': {
      const newOnChange = (e: any) =>
        field.onChange ? onChange(field.onChange(e)) : onChange(e);
      return SelectComponent<T>({
        ...field,
        value,
        onChange: newOnChange,
      });
    }
    case 'number':
      return (
        <TextInput
          error={error}
          {...(restField as any)}
          value={value?.toString()}
          onChange={e => {
            return field.onChange
              ? onChange((field.onChange as (e: any) => any)(e.target.value))
              : onChange(e.target.value);
          }}
        />
      );
    case 'boolean':
      return (
        <CheckBox
          error={error}
          {...(restField as any)}
          value={value}
          label={field.label || unPascalCase(field.name)}
          onChange={e =>
            field.onChange
              ? onChange((field.onChange as (e: any) => any)(e.target.checked))
              : onChange(e.target.checked)
          }
        />
      );
    case 'array':
      return <ArrayComponent {...field} value={value} onChange={onChange} />;
    case 'object-array':
      return (
        <ObjectArrayComponent {...field} value={value} onChange={onChange} />
      );
    case 'text':
      return (
        <TextComponent
          error={error}
          {...(restField as any)}
          value={value}
          onChange={e =>
            field.onChange
              ? onChange((field.onChange as (e: any) => any)(e))
              : onChange(e.target.value)
          }
        />
      );
    case 'date': {
      return (
        <TextInput
          error={error}
          {...(restField as any)}
          type="date"
          value={value}
          onChange={e =>
            field.onChange
              ? onChange((field.onChange as (e: any) => any)(e))
              : onChange(e.target.value)
          }
        />
      );
    }
    default: {
      return (
        <TextInput
          error={error}
          {...(restField as any)}
          value={value}
          type={'text'}
          onChange={e =>
            field.onChange
              ? onChange((field.onChange as (e: any) => any)(e))
              : onChange(e.target.value)
          }
        />
      );
    }
  }
};
