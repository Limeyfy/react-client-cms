import clsx from 'clsx';
import React from 'react';
import { Button } from '../Button';
import useClientCms from '../hooks/useClientCms';
import '../tailwind.css';
import { ErrorMessage } from './ErrorMessage';

export interface IClientCmsFileProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'value'
  > {
  files: FileList | null | string[];
  beforeUpload?: (file: File) => boolean;
}

export const FileInput = (props: IClientCmsFileProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { error } = useClientCms(props.name);

  const removeFile = (index: number) => {
    const newFiles = new DataTransfer();
    const files = props.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File;
      if (i !== index && file) {
        newFiles.items.add(file);
      }
    }
    props.onChange?.({
      target: {
        files: newFiles.files,
      },
    } as any);
  };

  const { beforeUpload, files, onChange, ...rest } = props;

  return (
    <div>
      <input
        {...rest}
        onChange={e => {
          if (!e.target.files) return;
          if (props.beforeUpload) {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (!props.beforeUpload(file)) return;
            }
          }
          props.onChange?.(e);
        }}
        className="sr-only"
        type="file"
        ref={inputRef}
      />
      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        variant="outline"
        disabled={props.disabled}
        className={clsx(
          props.disabled &&
            'bg-gray-100 hover:bg-gray-100 border-none text-gray-600'
        )}
      >
        Upload file
      </Button>
      {props.files && (
        <ul className="mt-2">
          {(typeof props.files[0] === 'string'
            ? (props.files as string[])
            : Array.from(props.files as FileList)
          ).map((file, fileIdx) => (
            <li key={fileIdx} className="flex justify-between">
              <span className="truncate w-3/4">
                {typeof file === 'string' ? file : file.name}
              </span>
              <svg
                onClick={() => removeFile(fileIdx)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="fill-red-400 cursor-pointer"
              >
                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
              </svg>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          <ErrorMessage error={error.type} message={error.message} />
        </p>
      )}
    </div>
  );
};
