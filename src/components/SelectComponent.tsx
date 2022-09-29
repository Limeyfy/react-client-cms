import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { IClientCmsSelectField } from '../client-cms';
import useClientCms from '../hooks/useClientCms';
import { ErrorMessage } from './ErrorMessage';

interface SelectComponentProps<T> extends IClientCmsSelectField<T> {
  value?: T | null;
}

export const SelectComponent = <T,>(props: SelectComponentProps<T>) => {
  let extraProps: any = {};
  props.onChange && (extraProps.onChange = props.onChange);
  const { error } = useClientCms(props.name);
  return (
    <div className="flex flex-col gap-0.5">
      <Listbox
        value={props.value}
        onChange={e => {
          props.onChange && e && props.onChange(e);
        }}
        disabled={props.disabled}
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                className={clsx(
                  'relative w-full cursor-default rounded-md border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
                  props.disabled ? 'bg-gray-100' : 'bg-white'
                )}
              >
                <span className="block truncate">
                  {props.value
                    ? props.renderLabel(props.value)
                    : props.nullValueText || 'Select an option'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {props.options.map((option: T, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        clsx(
                          active ? 'text-white bg-blue-600' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {props.renderLabel(option)}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-blue-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          <ErrorMessage error={error.type} key={error.message} />
        </p>
      )}
    </div>
  );
};
