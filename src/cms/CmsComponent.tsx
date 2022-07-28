import React, { useContext, useEffect, useState } from 'react';
import { classNames, CmsContext } from '..';
import { buildForm, formatForm } from './cms-functions';
import CmsArray from './CmsArray';
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
    const components = useContext(CmsContext).components;

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

    const handleAddToArray = (name: string, val: any) => {
        let { newArr, objectIdx } = getObjectIndexAndArray(name);
        if (newArr[objectIdx]?.value?.length <= 0) {
            newArr[objectIdx].value = [val];
        } else {
            newArr[objectIdx].value.push(val);
        }
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
                        if (components?.number) {
                            return (
                                <div id="client-cms-custom-number-component">
                                    {components.number(field, (e) =>
                                        handleInputNumberChange(e, field.name)
                                    )}
                                </div>
                            );
                        }
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
                        if (components?.checkbox) {
                            return (
                                <div id="client-cms-custom-checkbox-component">
                                    {components.checkbox(field, (e) =>
                                        handleInputBooleanChange(e, field.name)
                                    )}
                                </div>
                            );
                        }
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
                        if (components?.image) {
                            return (
                                <div id="client-cms-custom-checkbox-component">
                                    {components.image(field, (file) =>
                                        handleFileChange(file, field.name)
                                    )}
                                </div>
                            );
                        }
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
                        if (components?.images) {
                            return (
                                <div id="client-cms-custom-checkbox-component">
                                    {components.images(field, (files) =>
                                        handleFileChange(files, field.name)
                                    )}
                                </div>
                            );
                        }
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

                    case 'array': {
                        return (
                            <CmsArray
                                key={idx}
                                field={field}
                                onChange={(val) =>
                                    handleAddToArray(field.name, val)
                                }
                            />
                        );
                    }

                    default: {
                        if (components?.text) {
                            return (
                                <div id="client-cms-custom-checkbox-component">
                                    {components.text(field, (e) =>
                                        handleInputChange(e, field.name)
                                    )}
                                </div>
                            );
                        }
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
