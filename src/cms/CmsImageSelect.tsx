import React, { useRef } from 'react';
import { formatPascalAndSpace } from './cms-functions';
import { ICmsErrorHandling, ICmsField } from './CmsTypes';

export interface ICmsImageSelectProps {
  field: ICmsField;
  onChange: (val: File) => void;
  errorHanding?: ICmsErrorHandling;
}

const CmsImageSelect = ({
  field,
  onChange,
  errorHanding,
}: ICmsImageSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    inputRef.current!.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (
      !['image/jpeg', 'image/png', 'image/gif'].some((f) => file.type === f)
    ) {
      errorHanding?.onError &&
        errorHanding.onError(`Only jpeg, png and gif images are allowed`, 1002);
      return;
    }
    if (file) onChange(file);
  };

  const onImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.cursor = 'normal';
    const files = e.dataTransfer.files;

    if (
      !['image/jpeg', 'image/png', 'image/gif'].some((f) => files[0].type === f)
    ) {
      errorHanding?.onError &&
        errorHanding.onError(`Only jpeg, png and gif images are allowed`, 1002);
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
        {field.value && (
          <p className="bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">
            {field.value.name}
          </p>
        )}
        <p>{field.options?.text ?? 'Drop images here or click to select'}</p>
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CmsImageSelect;
