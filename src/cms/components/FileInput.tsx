import React from 'react';

export interface IClientCmsFileProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'value'
    > {
    files: FileList | null;
}

const File = (props: IClientCmsFileProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    console.log(props.files);

    const removeFile = (index: number) => {
        const newFiles = new DataTransfer();
        const files = props.files;
        if (!files) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
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

    return (
        <div>
            <input {...props} className="sr-only" type="file" ref={inputRef} />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="bg-white px-3 py-1 border border-gray-300 rounded-sm"
            >
                Upload file
            </button>
            {props.files && (
                <ul className="mt-2">
                    {Array.from(props.files).map((file, fileIdx) => (
                        <li key={fileIdx} className="flex justify-between">
                            <span>{file.name}</span>
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
        </div>
    );
};

export default File;
