import React from 'react';
import { IClientCmsSelectField } from '../types';

const SelectComponent = <T,>(props: IClientCmsSelectField<T>) => {
    let extraProps: any = {};
    props.onChange && (extraProps.onChange = props.onChange);
    return (
        <select
            className="w-full px-2 py-1 bg-white border-gray-300 focus:outline-blue-600"
            {...extraProps}
        >
            {props.options.map((option, idx) => (
                <option
                    key={`option-${idx}`}
                    value={
                        props.renderValue
                            ? props.renderValue(option)
                            : (option as any)
                    }
                >
                    {props.renderLabel
                        ? props.renderLabel(option)
                        : (option as any)}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent;
