import clsx from 'clsx';
import React from 'react';
import { ErrorMessage } from './ErrorMessage';

export interface IClientCmsInputPropsDetailed
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
}

export const TextInput = (props: IClientCmsInputPropsDetailed) => {
  const { children, error, ...rest } = props;
  return (
    <>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          {...rest}
          className={clsx(
            props.error
              ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            props.disabled ? 'bg-gray-100' : 'bg-white',
            'block w-full rounded-md shadow-sm sm:text-sm'
          )}
        />
        {props.error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        )}
      </div>
      {props.error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          <ErrorMessage error={props.error} />
        </p>
      )}
    </>
  );
};
