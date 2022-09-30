import clsx from 'clsx';
import React from 'react';
import { FieldError } from '../client-cms';
import { slugify } from '../func/textHelper';
import useClientCms from '../hooks/useClientCms';
import useDebounce from '../hooks/useDebounce';
import { ErrorMessage } from './ErrorMessage';

export interface IClientCmsInputPropsDetailed
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const TextInput = <T,>(props: IClientCmsInputPropsDetailed) => {
  const { children, validate, unique, ...rest } = props as any;
  const { error, fields, dispatch, dispatchErrors } = useClientCms(props.name);
  const debounce = useDebounce(props.value as string, 500);

  React.useEffect(() => {
    const asyncDebounce = async () => {
      const slugs = fields.filter(
        f => f.type === 'slug' && f.source === props.name
      );
      if (slugs.length < 1) return;
      for (var s = 0; s < slugs.length; s++) {
        const slug = slugs[s];
        dispatch((prev: T) => ({
          ...prev,
          [slug.name]: slugify(debounce),
        }));
        if (slug.validate === undefined) {
          dispatchErrors((prev: FieldError[]) =>
            prev.filter(x => x.id !== slug.name)
          );
          return;
        }
        const valid = await slug.validate(slugify(debounce));
        if (valid !== true) {
          const err = await valid;
          dispatchErrors((prev: FieldError[]) => [
            ...prev,
            {
              type: 'errors',
              message:
                typeof err === 'boolean'
                  ? 'Invalid slug'
                  : err.error ?? 'Invalid slug',
              id: slug.name,
            },
          ]);
        } else {
          dispatchErrors((prev: FieldError[]) =>
            prev.filter(x => x.id !== slug.name)
          );
        }
      }
    };
    asyncDebounce();
  }, [debounce]);

  return (
    <>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          {...rest}
          className={clsx(
            'block w-full rounded-md shadow-sm sm:text-sm',
            error
              ? '!border-red-300 pr-10 !text-red-900 !placeholder-red-300 focus:!border-red-500 focus:!outline-none focus:!ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            props.disabled ? 'bg-gray-100' : 'bg-white'
          )}
        />
        {error && (
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
      {error && (
        <p className="mt-1 text-sm text-red-600">
          <ErrorMessage error={error.type} message={error.message} />
        </p>
      )}
    </>
  );
};
