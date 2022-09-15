import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, InputNumber, Select, Upload } from 'antd';
import React, { useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from '..';
import { getDefaultValue } from '../helpers/data';
import { unPascalCase } from '../helpers/textHelper';
import LabelContainer from './LabelContainer';
import { IClientCms, IClientCmsField } from './types';

const ClientCms = <T,>({
    fields,
    onSubmit,
    loading,
    className,
    noClassOverride = true,
}: IClientCms<T>) => {
    const ID = useId();
    const { control, handleSubmit: handleSubmitForm } = useForm<any, T>({
        defaultValues: fields.reduce(
            (acc, field) => ({
                ...acc,
                [field.name]:
                    field.initValue ?? getDefaultValue(field.type ?? 'string'),
            }),
            {}
        ),
    });
    useEffect(() => {
        const fieldNames = fields.map((field) => field.name);
        const uniqueFieldNames = new Set(fieldNames);
        if (fieldNames.length !== uniqueFieldNames.size) {
            throw new Error('Two fields have the same name');
        }
    }, [fields]);

    const handleSubmit = (data: any) => {
        if (onSubmit === undefined) {
            console.error('OnSubmit is not defined');
            return;
        }
        onSubmit(data);
        return;
    };

    return (
        <form
            onSubmit={handleSubmitForm((data) => handleSubmit(data))}
            className={classNames(
                className
                    ? noClassOverride
                        ? className
                        : `flex flex-col gap-y-8 w-full ${className}`
                    : 'flex flex-col gap-y-8 w-full'
            )}
        >
            {fields.map((field, fieldIdx) =>
                field.type === 'boolean' ? (
                    <Controller
                        key={fieldIdx}
                        control={control}
                        name={field.name}
                        render={({ field: { onChange } }) =>
                            Component(field, onChange, ID)
                        }
                    />
                ) : (
                    <LabelContainer
                        key={fieldIdx}
                        label={field.label ?? unPascalCase(field.name)}
                    >
                        <Controller
                            control={control}
                            name={field.name}
                            render={({ field: { onChange } }) =>
                                Component(field, onChange, ID)
                            }
                        />
                    </LabelContainer>
                )
            )}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center rounded-sm border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {loading && (
                        <svg
                            role="status"
                            className="inline mr-3 w-4 h-4 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

const Component = <T,>(
    field: IClientCmsField<T>,
    onChange: (value: any) => void,
    id: string
) => {
    let props: any = field.props ? field.props : ({} as any);
    props = { ...props, onChange };
    props.id = props.id || id + '__' + field.name;

    switch (field.type) {
        case 'upload':
            return (
                <Upload
                    {...props}
                    defaultFileList={field.initValue}
                    onChange={(e) => onChange(e.fileList)}
                >
                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                        Click to Upload
                    </Button>
                </Upload>
            );
        case 'date':
            return (
                <DatePicker
                    defaultValue={field.initValue}
                    style={{ width: '100%' }}
                    {...props}
                />
            );
        case 'boolean': {
            return (
                <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            defaultChecked={field.initValue}
                            {...props}
                            onChange={(e) => onChange(e.target.checked)}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="candidates" className="text-gray-700">
                            {field.label ?? unPascalCase(field.name)}
                        </label>
                    </div>
                </div>
            );
        }

        case 'select':
            return (
                <Select
                    defaultValue={field.initValue || field.options[0]}
                    style={{ width: '100%' }}
                    {...props}
                >
                    {field.options.map((option, optionIdx) => (
                        <Select.Option
                            value={
                                field.getIdentify
                                    ? field.getIdentify(option)
                                    : option
                            }
                            key={optionIdx}
                        >
                            {field.getLabel
                                ? field.getLabel(option)
                                : option.toString()}
                        </Select.Option>
                    ))}
                </Select>
            );
        case 'number':
            return (
                <InputNumber
                    defaultValue={field.initValue}
                    style={{ width: '100%' }}
                    {...props}
                />
            );
        case 'text':
            return (
                <Input.TextArea
                    defaultValue={field.initValue}
                    className="w-full"
                    {...props}
                />
            );
        default:
            return (
                <Input
                    className="w-full"
                    defaultValue={field.initValue}
                    {...props}
                />
            );
    }
};

export default ClientCms;
