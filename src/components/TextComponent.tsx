import clsx from 'clsx';
import React from 'react';
import { ErrorMessage } from './ErrorMessage';

export interface IClientCmsTextAreaPropsDetailed
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
}

const TextComponent: React.FC<IClientCmsTextAreaPropsDetailed> = props => {
  return (
    <>
      <textarea
        rows={4}
        {...props}
        className={clsx(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
          props.disabled ? 'bg-gray-100' : 'bg-white',
          props.className
        )}
      />
      {props.error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          <ErrorMessage error={props.error} />
        </p>
      )}
    </>
  );
};

export default TextComponent;
