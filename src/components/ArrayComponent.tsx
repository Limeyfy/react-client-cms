import clsx from 'clsx';
import React, { useState } from 'react';
import { IClientCmsArrayField } from '../client-cms';

interface IArrayComponentProps extends Omit<IClientCmsArrayField, 'onChange'> {
  value: (string | number)[];
  onChange?: (array: (string | number)[]) => void;
}

const ArrayComponent: React.FC<IArrayComponentProps> = ({
  value,
  onChange,
  arrayType,
  renderLabel,
  disabled,
  name,
  label,
}) => {
  const [items, setItems] = useState<any[]>(value);
  const [text, setText] = useState('');

  const handleOnRemove = (idx: number) => {
    if (!onChange || disabled) return;
    let newArray = [...items];
    newArray.splice(idx, 1);
    onChange(newArray);
    setItems(newArray);
  };

  const handleAdd = () => {
    if (!onChange || disabled) return;
    const val = arrayType === 'number' ? parseInt(text) : text;
    let newArray = [...items, val];
    onChange(newArray);
    setItems(newArray);
    setText('');
  };

  return (
    <div
      className={clsx(
        'flex flex-col border border-gray-300 shadow-md rounded divide-y divide-gray-300',
        disabled ? 'bg-gray-100' : 'bg-white'
      )}
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <div className="flex items-center px-3" key={index}>
            <span className="text-gray-600 py-2 w-full truncate">
              {renderLabel ? renderLabel(item) : item}
            </span>
            {onChange && !disabled && (
              <button
                className="p-1 rounded-md transition-all hover:bg-gray-100"
                onClick={() => !disabled && handleOnRemove(index)}
                type="button"
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
        ))
      ) : (
        <div className="w-full h-24 flex justify-center items-center">
          <p className="text-sm text-gray-600 font-medium">
            {label ?? name} is empty
          </p>
        </div>
      )}
      {onChange && !disabled && (
        <div className="flex items-center justify-between px-3">
          <div className="w-full py-1">
            <input
              type="text"
              className={clsx(
                'border-none w-full focus:outline-none focus:border-none text-sm rounded-sm',
                disabled ? 'bg-gray-100' : 'bg-white'
              )}
              placeholder="..."
              onChange={e => setText(e.target.value)}
              value={text}
              disabled={disabled}
            />
          </div>
          <div
            className="px-4 h-full border-l border-gray-300"
            onClick={handleAdd}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="fill-gray-500 cursor-pointer w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArrayComponent;
