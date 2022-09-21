import React from 'react';
import { ErrorMessage } from './ErrorMessage';

interface CheckBoxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'children' | 'dangerouslySetInnerHTML'
  > {
  error?: string;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ error, label, ...rest }) => (
  <>
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          {...rest}
          type="checkbox"
          checked={(rest.value as any) as boolean}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="candidates" className="font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
    {error && <ErrorMessage error={error} />}
  </>
);

export { CheckBox, CheckBoxProps };
