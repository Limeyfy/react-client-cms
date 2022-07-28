import React, { useEffect, useState } from 'react';
import { classNames } from '..';
import { buildForm, formatForm } from './cms-functions';
import CmsCheckbox from './CmsCheckbox';
import CmsImageSelect from './CmsImageSelect';
import CmsInputField from './CmsInputField';
import { ICms, ICmsField } from './CmsTypes';

const CmsComponent = ({
    fields,
    onSubmit,
    className,
    formOptions,
    errorHandling,
}: ICms) => {
    const [form, setForm] = useState<ICmsField[]>([]);

    useEffect(() => {
        if (form.length <= 0) {
            setForm(buildForm(fields));
        }
    }, [fields]);

    const getObjectIndexAndArray = (name: string) => {
        let newArr = [...form];
        let objectIdx = form.findIndex((x: ICmsField) => x.name === name);
        return {
            newArr,
            objectIdx,
        };
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        setForm(newArr);
    };

    const handleInputNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        let number = Number(e.target.value);
        if (!isNaN(number)) {
            newArr[objectIdx].value = number;
        } else {
            newArr[objectIdx].value = e.target.value;
        }
        setForm(newArr);
    };

    const handleInputBooleanChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.checked;
        setForm(newArr);
    };

    const handleFileChange = (val: File | File[], name: string) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = val;
        setForm(newArr);
    };

    const handleRemoveFromArray = (i: number, name: string) => {
        let { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value.splice(i, 1);
        setForm(newArr);
    };

    return (
        <form
            className={classNames('mx-8 my-6 space-y-4', className)}
            onSubmit={(e) => onSubmit(e, formatForm(form))}
            {...formOptions}
        >
            {form.map((field, idx) => {
                switch (field.type) {
                    case 'number': {
                        return (
                            <CmsInputField
                                key={idx}
                                field={field}
                                onChange={(e) =>
                                    handleInputNumberChange(e, field.name)
                                }
                            />
                        );
                    }
                    case 'checkbox': {
                        return (
                            <CmsCheckbox
                                key={idx}
                                field={field}
                                onChange={(e) =>
                                    handleInputBooleanChange(e, field.name)
                                }
                            />
                        );
                    }
                    case 'image': {
                        return (
                            <CmsImageSelect
                                key={idx}
                                field={field}
                                onChange={(e) =>
                                    handleFileChange(e, field.name)
                                }
                                errorHanding={errorHandling}
                            />
                        );
                    }
                    case 'images': {
                        return (
                            <CmsImageSelect
                                key={idx}
                                field={field}
                                onChange={(e) =>
                                    handleFileChange(e, field.name)
                                }
                                errorHanding={errorHandling}
                                removeFromArray={(i) =>
                                    handleRemoveFromArray(i, field.name)
                                }
                                multiple
                            />
                        );
                    }

                    default: {
                        return (
                            <CmsInputField
                                key={idx}
                                field={field}
                                onChange={(e) =>
                                    handleInputChange(e, field.name)
                                }
                            />
                        );
                    }
                }
            })}
            <button type="submit">Submit</button>
        </form>
    );
};

export default CmsComponent;
