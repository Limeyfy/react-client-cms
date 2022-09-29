import clsx from 'clsx';
import React from 'react';
import useClientCms from '../hooks/useClientCms';
import { ErrorMessage } from './ErrorMessage';

interface CheckBoxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'children' | 'dangerouslySetInnerHTML'
  > {
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, ...rest }) => {
  const { error } = useClientCms(rest.name);
  return (
    <>
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            {...rest}
            type="checkbox"
            checked={(rest.value as any) as boolean}
            className={clsx(
              'h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
              error ? 'border-red-300' : 'border-gray-300',
              rest.disabled ? 'text-gray-300' : 'text-white'
            )}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="candidates" className="font-medium text-gray-700">
            {label}
          </label>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          <ErrorMessage error={error.type} key={error.message} />
        </p>
      )}
    </>
  );
};

export { CheckBox, CheckBoxProps };
