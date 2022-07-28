import React, { useRef } from 'react';
import { formatPascalAndSpace } from './cms-functions';
import { ICmsErrorHandling, ICmsField } from './CmsTypes';

export interface ICmsImageSelectProps {
    field: ICmsField;
    onChange: (val: File | File[]) => void;
    errorHanding?: ICmsErrorHandling;
    multiple?: boolean;
    removeFromArray?: (i: number) => void;
}

const CmsImageSelect = ({
    field,
    onChange,
    errorHanding,
    multiple = false,
    removeFromArray,
}: ICmsImageSelectProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        inputRef.current!.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        if (
            !['image/jpeg', 'image/png', 'image/gif'].some(
                (f) => file.type === f
            )
        ) {
            errorHanding?.onError &&
                errorHanding.onError(
                    `Only jpeg, png and gif images are allowed`,
                    1002
                );
            return;
        }
        if (multiple) {
            let prevFiles: File[] = field.value ?? [];
            for (var i = 0; i < e.target.files!.length; i++) {
                prevFiles.push(e.target.files![i]);
            }
            onChange(prevFiles);
            return;
        }

        if (file) onChange(file);
    };

    const onImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.cursor = 'normal';
        const files = e.dataTransfer.files;

        if (
            !['image/jpeg', 'image/png', 'image/gif'].some(
                (f) => files[0].type === f
            )
        ) {
            errorHanding?.onError &&
                errorHanding.onError(
                    `Only jpeg, png and gif images are allowed`,
                    1002
                );
            return;
        }
        if (files[0]) onChange(files[0]);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.cursor = 'copy';
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.cursor = 'normal';
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.cursor = 'copy';
    };

    return (
        <div>
            <label
                htmlFor={'field.name'}
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
                {field.label ?? formatPascalAndSpace(field.name)}
            </label>
            <div
                onClick={handleClick}
                className="border-2 border-dashed border-gray-300 dark:border-stone-700 w-full h-48 rounded-lg flex justify-center items-center flex-col"
                onDrop={(e) => onImageDrop(e)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDragOver={(e) => handleDragOver(e)}
                ref={divRef}
            >
                {field.value && !multiple && (
                    <p className="bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">
                        {field.value.name}
                    </p>
                )}
                <p>
                    {field.options?.text ??
                        'Drop images here or click to select'}
                </p>
                <input
                    ref={inputRef}
                    className="sr-only"
                    type="file"
                    onChange={handleFileChange}
                    multiple={multiple}
                />
            </div>
            <div className="flex-col flex space-y-2 py-6">
                {field.value.length > 0 &&
                    field.value.map((item: File, idx: number) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center border rounded-md border-gray-300 dark:border-stone-700 px-4 py-2"
                        >
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {item.name}
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    removeFromArray && removeFromArray(idx)
                                }
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CmsImageSelect;
