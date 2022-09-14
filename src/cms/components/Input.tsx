import React from 'react';
import { classNames } from '../..';

const Input = (
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
) => {
    return (
        <input
            {...props}
            className={classNames(
                'w-full bg-white border border-gray-300',
                props.type !== 'color' ? 'px-2 py-1' : 'h-6',
                props.className
            )}
        />
    );
};

export default Input;
