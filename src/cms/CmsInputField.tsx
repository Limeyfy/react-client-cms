import React from 'react';
import { classNames } from '..';
import { ICmsField } from './CmsTypes';

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
          className="block text-sm font-medium text-gray-700"
        >
          {field.name}
        </label>
        <span className="text-sm text-gray-500" id="email-optional">
          Optional
        </span>
      </div>
      <div className="mt-1">
        <input
          type="email"
          name={field.name}
          id="email"
          className={classNames(
            'shadow-sm block w-full sm:text-sm  rounded-md',
            !(field.validation && field.validation(field.value))
              ? ' focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
              : 'focus:ring-red-500 focus:border-red-500 border-gray-300',
            field.className
          )}
          placeholder="you@example.com"
          aria-describedby="email-optional"
          value={field.value ?? ''}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CmsInputField;
