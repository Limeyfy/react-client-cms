import React, { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

// ! Add the CSS import statement !
import './tailwind.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const colors = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-blue-100 text-blue-500 hover:bg-blue-200',
  outline:
    'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100',
  ghost: 'bg-transparent text-blue-500 hover:bg-blue-100',
};

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
};

// ...

// we'll add some Tailwind classes on our components to test

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => (
  <button
    {...props}
    className={clsx(
      'rounded bg-blue-500',
      colors[variant],
      sizes[size],
      props.className
    )}
  >
    {children || 'My button'}
  </button>
);
