import React from 'react';

function getMessage(type: string) {
    switch (type) {
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

const ErrorMessage = ({ error }: { error: any }) => {
    console.log(error);
    return (
        <span className="text-sm text-red-400">{getMessage(error.type)}</span>
    );
};

export default ErrorMessage;
