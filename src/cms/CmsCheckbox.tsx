import React from 'react';
import { ICmsField } from '.';
import { classNames } from '..';
import { formatPascalAndSpace } from './cms-functions';

export interface ICmsCheckboxProps {
  field: ICmsField;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CmsCheckbox: React.FC<ICmsCheckboxProps> = ({
  field,
  onChange,
}: ICmsCheckboxProps) => {
  return (
    <div className="relative flex items-center justify-between mb-5">
      <div className="min-w-0 flex-0 text-sm">
        <label className="font-medium text-gray-700 dark:text-gray-300 select-none">
          {field.label ?? formatPascalAndSpace(field.name)}
        </label>
      </div>
      <div
        className={classNames('ml-3 flex items-center h-5', field.className)}
      >
        <input
          type="checkbox"
          name={field.name}
          id={field.name}
          className="focus:ring-limeyfy-500 h-5 w-5 text-limeyfy-600 border-gray-300 dark:border-stone-700 dark:bg-stone-800 rounded"
          checked={field.value}
          onChange={e => onChange(e)}
        />
      </div>
    </div>
  );
};

export default CmsCheckbox;
