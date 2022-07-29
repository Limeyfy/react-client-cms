import React, { useState } from 'react';
import { classNames, CmsInputField } from '..';
import { formatPascalAndSpace } from './cms-functions';
import { ICmsField, ICmsFieldField } from './CmsTypes';
import { PlusSmIcon } from '@heroicons/react/outline';

interface ICmsArrayProps {
    field: ICmsField;
    onChange: (val: string | any) => void;
}

const CmsArray: React.FC<ICmsArrayProps> = ({
    field,
    onChange,
}: ICmsArrayProps) => {
    const [current, setCurrent] = useState<null | string | any>(null);

    const handleAddToArray = () => {
        if (current === null) return;
        console.log(current);
        onChange(current);
        setCurrent(null);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrent(e.target.value);
    };

    return (
        <div>
            {!field.of || field.of === 'string' ? (
                <>
                    <div className="flex justify-between">
                        <label
                            htmlFor={field.name}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            {field.label ?? formatPascalAndSpace(field.name)}
                        </label>
                        {field.optional === undefined ||
                            (field.optional === true && (
                                <span
                                    className="text-sm text-gray-500 dark:text-gray-400"
                                    id="email-optional"
                                >
                                    Optional
                                </span>
                            ))}
                    </div>
                    <div className="flex-col flex space-y-1 py-2">
                        {field.value.length > 0 &&
                            field.value.map(
                                (item: any | string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center border rounded-md border-gray-300 dark:border-stone-700 px-4 py-2"
                                    >
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {item}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                console.log('remove')
                                            }
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )
                            )}
                    </div>
                    <div className="mt-1 flex ">
                        <input
                            type="text"
                            name={field.name}
                            id={field.name + '-cmsInput'}
                            className={classNames(
                                'shadow-sm block w-full sm:text-sm  rounded-md',
                                'focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-stone-700 dark:text-gray-200 dark:bg-stone-800',
                                field.className
                            )}
                            placeholder={field.placeholder}
                            value={current ?? ''}
                            onChange={(e) => setCurrent(e.target.value)}
                        />
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md ml-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleAddToArray}
                        >
                            Add
                            <PlusSmIcon
                                className="ml-2 -mr-1 h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <div className="flex justify-between">
                            <label
                                htmlFor={field.name}
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                {field.label ??
                                    formatPascalAndSpace(field.name)}
                            </label>
                            {field.optional === undefined ||
                                (field.optional === true && (
                                    <span
                                        className="text-sm text-gray-500 dark:text-gray-400"
                                        id="email-optional"
                                    >
                                        Optional
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className="border-l-2 border-l-gray-300 dark:border-l-stone-700 ml-12 py-4 mt-4 pl-4">
                        {field.fields!.map(
                            (subField: ICmsFieldField, subFieldIdx: number) => {
                                switch (subField.type) {
                                    default: {
                                        return (
                                            <CmsInputField
                                                key={subFieldIdx}
                                                field={subField}
                                                onChange={(e) => {
                                                    handleTextChange(e);
                                                }}
                                            />
                                        );
                                    }
                                }
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CmsArray;
