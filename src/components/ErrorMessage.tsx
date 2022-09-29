import React from 'react';

function getMessage(type: string, message?: string) {
  switch (type) {
    case 'custom':
      return message ?? 'This field is invalid';
    case 'required':
      return 'This field is required';
    case 'min':
      return 'This field is too short';
    case 'max':
      return 'This field is too long';
    case 'minLength':
      return 'This field is too short';
    case 'maxLength':
      return 'This field is too long';
    case 'pattern':
      return 'This field is invalid';
    case 'validate':
      return 'This field is invalid';
    default:
      return 'This field is invalid';
  }
}

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

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error = 'validate',
  message,
}) => (
  <span className="text-sm text-red-400">{getMessage(error, message)}</span>
);
