import clsx from 'clsx';
import React from 'react';
import { formatDataOnSubmit, getDefaultValueForFields } from '../func/data';
import { unPascalCase } from '../func/textHelper';
import '../tailwind.css';
import { Component } from './CmsComponent';
import LabelContainer from './LabelContainer';
import { FieldError, IClientCms, IClientCmsValidate } from './types';

export interface IClientCmsContextProps extends IClientCms<any> {
  errors: FieldError[];
}

export const IClientCmsContext = React.createContext<IClientCmsContextProps>({
  fields: [],
  errors: [],
});

export const ClientCms = <T,>({
  fields,
  onSubmit,
  loading,
  className,
  logErrors = false,
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
    if (onSubmit === undefined) {
      console.error('OnSubmit is not defined');
      return;
    }
    if (errors.length > 0) {
      form.current?.scrollIntoView({ behavior: 'smooth' });
      logErrors &&
        console.error(
          'Form could not submit because of these errors: ',
          errors
        );
      return;
    }
    const formattedData = formatDataOnSubmit(data, fields);
    onSubmit(formattedData);
    return;
  };

  const removeError = (idx: number) => {
    let newErrors = [...errors];
    newErrors.splice(idx, 1);
    setErrors(newErrors);
  };

  const validateComponent = (
    val: any,
    name: string,
    action: () => void,
    validate?: IClientCmsValidate<any>
  ) => {
    const existingError = errors.findIndex(x => x.id === name);
    if (!validate) {
      if (existingError !== -1) removeError(existingError);
      action();
      return val;
    }
    const isValid = validate(val);
    if (isValid !== true) {
      const obj = {
        id: name,
        message:
          typeof isValid === 'boolean'
            ? 'Invalid'
            : (isValid as { error?: string }).error ?? 'Invalid',
        type: 'custom',
      };
      if (existingError !== -1) {
        let newErrors = [...errors];
        newErrors[existingError] = obj;
        setErrors(newErrors);
      } else {
        setErrors([...errors, obj]);
      }
      action();
    } else {
      if (existingError !== -1) removeError(existingError);
      action();
    }
  };

  return (
    <IClientCmsContext.Provider
      value={{ fields, onSubmit, loading, className, errors, ...cRest }}
    >
      <form
        onSubmit={handleSubmit}
        className={clsx(
          'flex flex-col max-w-2xl mx-auto gap-y-8 w-full',
          className
        )}
        ref={form}
      >
        {fields.map(field =>
          field.type === 'object' ? (
            <div
              key={`form_obj_${field.name}`}
              className="border-l border-gray-300 py-3"
            >
              <h2 className="text-lg font-semibold ml-5  mb-3">
                {field.label || unPascalCase(field.name)}
              </h2>
              <div className="ml-5 flex flex-col gap-y-3">
                {field.fields.map(f => {
                  let mField = { ...f };
                  mField.disabled = field.disabled ?? f.disabled ?? false;
                  return (
                    <LabelContainer
                      key={`form_elem_${field.name}_${f.name}`}
                      label={f.label ?? unPascalCase(f.name)}
                      show={f.type === 'boolean' ? false : true}
                    >
                      {Component(
                        mField,
                        val =>
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
                          ),
                        (data as any)[field.name]
                          ? (data as any)[field.name][f.name]
                          : undefined
                      )}
                    </LabelContainer>
                  );
                })}
              </div>
            </div>
          ) : (
            <LabelContainer
              key={`form_elem_${field.name}`}
              label={field.label ?? unPascalCase(field.name)}
              show={field.type === 'boolean' ? false : true}
            >
              {Component(
                field,
                val =>
                  validateComponent(
                    val,
                    field.name,
                    () => setData(pd => ({ ...pd, [field.name]: val })),
                    field.validate
                  ),
                (data as any)[field.name]
              )}
            </LabelContainer>
          )
        )}
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="submitButton">
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
          </button>
        </div>
      </form>
    </IClientCmsContext.Provider>
  );
};
