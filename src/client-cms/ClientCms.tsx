import clsx from 'clsx';
import React from 'react';
import { TextInput } from '../components';
import CCSubmitBtn from '../components/CCSubmitBtn';
import {
  checkForAnyErrors,
  formatDataOnSubmit,
  getDefaultValueForFields,
} from '../func/data';
import { unPascalCase } from '../func/textHelper';
import '../tailwind.css';
import { Component } from './CmsComponent';
import LabelContainer from './LabelContainer';
import { FieldError, IClientCms, IClientCmsValidate } from './types';

export interface IClientCmsContextProps<T> extends IClientCms<T> {
  errors: FieldError[];
  dispatch: React.Dispatch<React.SetStateAction<T>>;
  dispatchErrors: React.Dispatch<React.SetStateAction<FieldError[]>>;
}

export const IClientCmsContext = React.createContext<
  IClientCmsContextProps<any>
>({
  fields: [],
  errors: [],
  dispatch: () => {},
  dispatchErrors: () => {},
});

export const ClientCms = <T,>({
  fields,
  onSubmit,
  loading,
  className,
  logErrors = false,
  bottomElement,
  ...cRest
}: IClientCms<T>) => {
  const form = React.useRef<HTMLFormElement>(null);
  const [data, setData] = React.useState<T>(getDefaultValueForFields(fields));
  const [errors, setErrors] = React.useState<FieldError[]>([]);

  React.useEffect(() => {
    const fieldNames = fields.map(field => field.name);
    const uniqueFieldNames = new Set(fieldNames);
    if (fieldNames.length !== uniqueFieldNames.size) {
      throw new Error('Two fields have the same name');
    }
  }, [fields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _errors = checkForAnyErrors(fields, data);
    setErrors(_errors);
    if (onSubmit === undefined) {
      console.error('OnSubmit is not defined');
      return;
    }
    if (_errors.length > 0) {
      form.current?.scrollIntoView({ behavior: 'smooth' });
      logErrors &&
        console.error(
          'Form could not submit because of these errors: ',
          _errors
        );
      return;
    }
    const formattedData = formatDataOnSubmit(data, fields);
    onSubmit(formattedData);
    return;
  };

  function removeErr(id: string) {
    const existingError = errors.findIndex(x => x.id === id);
    if (existingError !== -1) {
      let newErrors = [...errors];
      newErrors.splice(existingError, 1);
      setErrors(newErrors);
    }
  }

  const validateComponent = (
    val: any,
    name: string,
    action: () => void,
    validate?: IClientCmsValidate<any>
  ) => {
    removeErr(name);
    if (!validate) {
      action();
      return val;
    }
    const isValid = validate(val);
    if (isValid !== true) {
      // create new error
      const obj = {
        id: name,
        message:
          typeof isValid === 'boolean'
            ? 'Invalid'
            : (isValid as { error?: string }).error ?? 'Invalid',
        type: 'custom',
      };
      setErrors([...errors, obj]);
    }
    action();
  };

  return (
    <IClientCmsContext.Provider
      value={{
        fields,
        onSubmit,
        dispatch: setData,
        dispatchErrors: setErrors,
        loading,
        className,
        errors,
        ...cRest,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className={clsx(
          'flex flex-col max-w-2xl mx-auto gap-y-8 w-full',
          className
        )}
        ref={form}
      >
        {fields.map(field => {
          switch (field.type) {
            case 'object':
              return (
                <div
                  key={`form_obj_${field.name}`}
                  className="border-l border-gray-300 py-3"
                >
                  <h2 className="text-lg font-semibold ml-5 mb-3">
                    {field.label || unPascalCase(field.name)}
                  </h2>
                  <div className="ml-5 flex flex-col gap-y-3">
                    {field.fields.map(f => (
                      <LabelContainer
                        key={`form_elem_${field.name}_${f.name}`}
                        label={f.label ?? unPascalCase(f.name)}
                        show={f.type === 'boolean' ? false : true}
                      >
                        <Component
                          field={{
                            ...f,
                            disabled: field.disabled ?? f.disabled ?? false,
                          }}
                          onChange={val =>
                            validateComponent(
                              val,
                              `${field.name}_${f.name}`,
                              () =>
                                setData(pd => ({
                                  ...pd,
                                  [field.name]: {
                                    ...pd[field.name],
                                    [f.name]: val,
                                  },
                                })),
                              field.validate
                            )
                          }
                          value={
                            (data as any)[field.name]
                              ? (data as any)[field.name][f.name]
                              : undefined
                          }
                        />
                      </LabelContainer>
                    ))}
                  </div>
                </div>
              );
            case 'slug': {
              const _onChange = (val: string) => {
                const isValid = field.validate ? field.validate(val) : true;
                if (isValid !== true) {
                  const obj = {
                    id: field.name,
                    message:
                      typeof isValid === 'boolean'
                        ? 'Invalid'
                        : (isValid as { error?: string }).error ?? 'Invalid',
                    type: 'custom',
                  };
                  setErrors([...errors, obj]);
                } else {
                  removeErr(field.name);
                }
                setData(pd => ({
                  ...pd,
                  [field.name]: val,
                }));
              };
              return (
                <LabelContainer
                  key={`form_elem_${field.name}`}
                  label={field.label ?? unPascalCase(field.name)}
                >
                  <TextInput
                    {...(field as any)}
                    value={data[field.name]}
                    disabled
                    type={'text'}
                    onChange={e =>
                      field.onChange
                        ? _onChange((field.onChange as (e: any) => any)(e))
                        : _onChange(e.target.value)
                    }
                  />
                </LabelContainer>
              );
            }

            default:
              return (
                <LabelContainer
                  key={`form_elem_${field.name}`}
                  label={field.label ?? unPascalCase(field.name)}
                  show={field.type === 'boolean' ? false : true}
                >
                  <Component
                    field={field}
                    onChange={val =>
                      validateComponent(
                        val,
                        field.name,
                        () => setData(pd => ({ ...pd, [field.name]: val })),
                        field.validate
                      )
                    }
                    value={(data as any)[field.name]}
                  />
                </LabelContainer>
              );
          }
        })}
        {bottomElement ? (
          <div>{bottomElement({ loading: loading ? true : false, data })}</div>
        ) : (
          <CCSubmitBtn loading={loading} />
        )}
      </form>
    </IClientCmsContext.Provider>
  );
};
