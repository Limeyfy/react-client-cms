import { FieldError, IClientCms, IClientCmsField, IClientCmsObjectField, IClientCmsSimpleField } from '../client-cms/types';

function toDateInputValue(date: Date) {
  var local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

export function getDefaultValue(type: IClientCmsField<any>['type']) {
  switch (type) {
    case 'number':
      return 0;
    case 'file':
      return null;
    case 'date':
      return toDateInputValue(new Date());
    case 'time':
      return '00:00';
    case 'datetime-local':
      return toDateInputValue(new Date());
    case 'select':
      return null;
    case 'array': return [];
    case 'boolean': return false;
    case "object-array": return []
    default:
      return '';
  }
}

export function getDefaultValueForObject(
  field: IClientCmsObjectField<any>,
  defaultValue: any = {},
) {
  if (field.type === 'object') {
    field.fields.forEach((f) => {
      defaultValue[f.name] = f.defaultValue ?? getDefaultValue(f.type);
    });
  }
  return defaultValue;
}

export function getDefaultValueForFields(fields: IClientCmsField<any>[]) {
  return fields.reduce((acc: any, field) => {
    if (field.type === 'object') {
      field.fields.forEach((f) => {
        if (!acc[field.name]) {
          acc[field.name] = {}
        }
        acc[field.name][f.name] = f.defaultValue ?? getDefaultValue(f.type);
      });
    } else {
      acc[field.name] = field.defaultValue ?? getDefaultValue(field.type);
    }
    return acc;
  }, {});
}

export function formatDataOnSubmit(data: any, fields: IClientCmsField<any>[]) {
  let formattedData: any = {}
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (field.type === 'object') {
      field.fields.forEach((f) => {
        if (!formattedData[field.name]) {
          formattedData[field.name] = {}
        }
        formattedData[field.name][f.name] = data[field.name][f.name]
      });
    } else {
      formattedData[field.name] = data[field.name]
    }
  }
  return formattedData;
}

export function getDefaultValueForSimpleFields(fields: IClientCmsSimpleField<any>[]) {
  return fields.reduce((acc: any, field) => {
    acc[field.name] = field.defaultValue ?? getDefaultValue(field.type);
    return acc;
  }, {});
}

export async function checkForAnyErrors(fields: IClientCms<any>["fields"], data: any) {
  let errors: FieldError[] = [];
  const fieldsWithValidation = fields.filter((f) => f.validate);
  for (let i = 0; i < fieldsWithValidation.length; i++) {
    const field = fieldsWithValidation[i];
    if (field.type === 'object') {
      field.fields.forEach((f) => {
        const error = field.validate?.(data[`${field.name}_${f.name}`]);
        if (error !== true) {
          errors.push({
            id: `${field.name}_${f.name}`,
            message: typeof error === "boolean" ? "Invalid field" : (error?.error ?? "Invalid field"),
            type: "error"
          });
        }
      });
    } else {
      let error: {
        error?: string;
      } | boolean | Promise<boolean | {
        error?: string;
      }> = false;
      if (field.validate) {
        error = field.validate(data[field.name]);
      }
      let err = field.type === "slug" ? await error : error as ({ error?: string } | boolean);
      if (err !== true) {
        errors.push({
          id: field.name,
          message: typeof err === "boolean" ? "Invalid field" : (err.error ?? "Invalid field"),
          type: "error"
        });
      }
    }
  }
  return errors;
}