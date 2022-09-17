import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button';
import { TextInput } from '../components';
import { getDefaultValue } from '../func/data';
import { unPascalCase } from '../func/textHelper';
import FileInput from './FileInput';
import LabelContainer from './LabelContainer';
import SelectComponent from './SelectComponent';
import { IClientCms, IClientCmsField } from './types';
import '../tailwind.css';

const ClientCms = <T,>({
  fields,
  onSubmit,
  loading,
  className,
}: IClientCms<T>) => {
  const form = useRef<HTMLFormElement>(null);
  const { handleSubmit: handleFormSubmit, control } = useForm<any, T>({
    defaultValues: fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]:
          field.defaultValue ?? getDefaultValue(field.type ?? 'text'),
      }),
      {}
    ),
  });
  const [errors, setErrors] = useState<any>(null);

  useEffect(() => {
    const fieldNames = fields.map(field => field.name);
    const uniqueFieldNames = new Set(fieldNames);
    if (fieldNames.length !== uniqueFieldNames.size) {
      throw new Error('Two fields have the same name');
    }
  }, [fields]);

  const handleErrors = (errors: any) => setErrors(errors);

  const handleSubmit = (data: T) => {
    if (onSubmit === undefined) {
      console.error('OnSubmit is not defined');
      return;
    }
    onSubmit(data);
    return;
  };

  return (
    <form
      onSubmit={handleFormSubmit(data => handleSubmit(data as T), handleErrors)}
      className={clsx(
        className ? className : 'flex flex-col max-w-2xl mx-auto gap-y-8 w-full'
      )}
      ref={form}
    >
      {fields.map((field, fieldIdx) => (
        <LabelContainer
          key={fieldIdx}
          label={field.label || unPascalCase(field.name)}
        >
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value } }) =>
              Component(
                field,
                onChange,
                value,
                errors?.[field.name] && (errors?.[field.name] as any).type
              )
            }
          />
        </LabelContainer>
      ))}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading && (
            <svg
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

const Component = <T,>(
  field: IClientCmsField<T>,
  onChange: (value: any) => void,
  value: any,
  error?: string
) => {
  switch (field.type) {
    case 'file':
      const { value: _, ...rest } = field;
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
          {...(field as any)}
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
    default: {
      return (
        <TextInput
          error={error}
          {...(field as any)}
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

export default ClientCms;
