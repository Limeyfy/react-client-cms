import clsx from 'clsx';
import React from 'react';
import useClientCms from '../hooks/useClientCms';
import { ErrorMessage } from './ErrorMessage';

export interface IClientCmsTextAreaPropsDetailed
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextComponent: React.FC<IClientCmsTextAreaPropsDetailed> = props => {
  const { error } = useClientCms(props.name);
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
      {error && (
        <p className="mt-2 text-sm text-red-600">
          <ErrorMessage error={error.type} key={error.message} />
        </p>
      )}
    </>
  );
};

export default TextComponent;
