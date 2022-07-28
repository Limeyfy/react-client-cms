import React from 'react';
import { classNames } from '..';
import { ICmsField, types } from './CmsTypes';

interface ICmsFieldProps {
  field: ICmsField;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CmsInputField = ({ field, onChange }: ICmsFieldProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {field.name}
        </label>
        {field.optional === undefined ||
          (field.optional === true && (
            <span
              className="text-sm text-gray-500 dark:text-gray-400"
              id="email-optional"
            >
              Optional
            </span>
          ))}
      </div>
      <div className="mt-1">
        <input
          type={types[field.type]}
          name={field.name}
          id="email"
          className={classNames(
            'shadow-sm block w-full sm:text-sm  rounded-md',
            'focus:ring-limeyfy-500 focus:border-limeyfy-500 border-gray-300 dark:border-stone-700 dark:text-gray-200 dark:bg-stone-800',
            field.className
          )}
          placeholder={field.placeholder}
          value={field.value ?? ''}
          onChange={onChange}
        />
        <p className="text-xs text-red-500"></p>
      </div>
    </div>
  );
};

export default CmsInputField;
