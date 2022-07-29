import React, { useContext } from 'react';
import { CmsContext, ICmsField } from '.';
import { classNames } from '..';
import { formatPascalAndSpace } from './cms-functions';

export interface ICmsCheckboxProps {
    field: ICmsField;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CmsCheckbox: React.FC<ICmsCheckboxProps> = ({
    field,
    onChange,
}: ICmsCheckboxProps) => {
    const dark = useContext(CmsContext)?.dark;

    return (
        <div className="relative flex items-center justify-between mb-5">
            <div className="min-w-0 flex-0 text-sm">
                <label
                    className={classNames(
                        'font-medium select-none',
                        dark ? 'text-gray-200' : 'text-gray-700'
                    )}
                >
                    {field.label ?? formatPascalAndSpace(field.name)}
                </label>
            </div>
            <div
                className={classNames(
                    'ml-3 flex items-center h-5',
                    field.className
                )}
            >
                <input
                    type="checkbox"
                    name={field.name}
                    id={field.name}
                    className={classNames(
                        'focus:ring-blue-400 h-5 w-5 text-blue-500 rounded',
                        dark
                            ? 'border-stone-700 bg-stone-800'
                            : 'border-gray-300',
                        field.className
                    )}
                    checked={field.value}
                    onChange={(e) => onChange(e)}
                />
            </div>
        </div>
    );
};

export default CmsCheckbox;
