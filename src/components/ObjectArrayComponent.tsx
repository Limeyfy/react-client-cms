import React, { useState } from 'react';
import { Button } from '../Button';
import { IClientCmsObjectArrayField, LabelContainer } from '../client-cms';
import { Component } from '../client-cms/CmsComponent';
import { getDefaultValueForSimpleFields } from '../func/data';
import { unPascalCase } from '../func/textHelper';

interface IObjectArrayComponentProps
  extends Omit<IClientCmsObjectArrayField, 'onChange'> {
  value: any[];
  onChange?: (array: any[]) => void;
}

const ObjectArrayComponent: React.FC<IObjectArrayComponentProps> = ({
  value,
  onChange,
  renderLabel,
  fields,
  options,
}) => {
  const [items, setItems] = useState<any[]>(value);
  const [item, setItem] = useState<any>(getDefaultValueForSimpleFields(fields));

  const handleOnRemove = (idx: number) => {
    if (!onChange) return;
    let newArray = [...items];
    newArray.splice(idx, 1);
    onChange(newArray);
    setItems(newArray);
  };

  const handleAdd = () => {
    if (!onChange) return;
    if (!item) return;
    let newArray = [...items, item];
    onChange(newArray);
    setItems(newArray);
    setItem(getDefaultValueForSimpleFields(fields));
  };

  return (
    <div className="flex flex-col bg-white border border-gray-300 shadow-md rounded divide-y divide-gray-300">
      {items.map((item, index) => (
        <div className="flex items-center px-3" key={index}>
          <span className="text-gray-600 py-2 w-full truncate">
            {options?.showItemIndex && `${index}. `}
            {renderLabel ? renderLabel(item) : item}
          </span>
          {onChange && (
            <button
              className="p-1 rounded-md transition-all hover:bg-gray-100"
              onClick={() => handleOnRemove(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
      <div className="px-4 py-3 flex flex-col gap-y-2">
        {fields.map((f, fIdx) => {
          let fName = f.name.split('.').pop() || '';
          return (
            <LabelContainer key={fIdx} label={f.label ?? unPascalCase(fName)}>
              {Component(
                { ...f, name: fName },
                val => setItem((prev: any) => ({ ...prev, [fName]: val })),
                item[f.name]
              )}
            </LabelContainer>
          );
        })}
        <Button variant="secondary" onClick={handleAdd}>
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default ObjectArrayComponent;
