import React, { useContext } from 'react';
import { classNames, CmsContext } from '..';
import { formatPascalAndSpace } from './cms-functions';
import { ICmsField } from './CmsTypes';

interface ICmsFieldProps {
    field: ICmsField;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    universalClassName?: string[];
}

const CmsInputField = ({ field, onChange }: ICmsFieldProps) => {
    const dark = useContext(CmsContext)?.dark;
    return (
        <div>
            <div className="flex justify-between">
                <label
                    htmlFor={field.name}
                    className={classNames(
                        'block text-sm font-medium',
                        dark ? 'text-gray-200' : 'text-gray-700'
                    )}
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
            <div className="mt-1">
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name + '-cmsInput'}
                    className={classNames(
                        'shadow-sm block w-full sm:text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500',
                        dark
                            ? ' border-stone-700 text-gray-200 bg-stone-800'
                            : 'border-gray-300',
                        field.className
                    )}
                    placeholder={field.placeholder}
                    value={field.value ?? ''}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default CmsInputField;
