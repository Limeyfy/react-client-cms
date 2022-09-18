import { IClientCmsField, IClientCmsObjectField } from '../client-cms/types';

function toDateInputValue(date: Date) {
  var local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

export function getDefaultValue(type: IClientCmsField<any>['type']) {
  switch (type) {
    case 'text':
      return '';
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
        acc[`${field.name}_${f.name}`] = f.defaultValue ?? getDefaultValue(f.type);
      });
    } else {
      acc[field.name] = field.defaultValue ?? getDefaultValue(field.type);
    }
    return acc;
  }, {});
}