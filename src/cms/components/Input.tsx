import ExclamationCircleIcon from '@heroicons/react/20/solid/ExclamationCircleIcon';
import React from 'react';
import { ErrorMessage } from '.';
import { classNames } from '../..';

interface IClientCmsInputPropsDetailed
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    error?: string;
}

const Input = (props: IClientCmsInputPropsDetailed) => {
    return (
        <>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    {...props}
                    className={classNames(
                        props.error
                            ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                        'block w-full rounded-md shadow-sm sm:text-sm'
                    )}
                />
                {props.error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
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

export default Input;
