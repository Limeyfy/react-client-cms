import React from 'react';
import { CheckBox, FileInput, SelectComponent, TextInput } from '../components';
import ArrayComponent from '../components/ArrayComponent';
import { unPascalCase } from '../func/textHelper';
import { IClientCmsArrayField, IClientCmsSimpleField } from './types';

export const Component = <T,>(
  field: IClientCmsSimpleField<T> | IClientCmsArrayField<T>,
  onChange: (value: any) => void,
  value: any,
  error?: string
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
          beforeUpload={field.beforeUpload}
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
          value={value.toString()}
          onChange={e =>
            field.onChange
              ? onChange(
                  (field.onChange as (e: any) => any)(parseInt(e.target.value))
                )
              : onChange(parseInt(e.target.value))
          }
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
    default: {
      return (
        <TextInput
          error={error}
          {...(restField as any)}
          value={value}
          onChange={e =>
            field.onChange
              ? onChange((field.onChange as (e: any) => any)(e))
              : onChange(e)
          }
        />
      );
    }
  }
};
