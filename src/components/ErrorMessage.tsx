import React from 'react';

export type ErrorMessageProps = {
  error:
    | 'required'
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'validate'
    | string;
  message?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <span className="text-sm text-red-400">
    {message ?? 'This field is invalid'}
  </span>
);
