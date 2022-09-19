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
}) => {
  const [items, setItems] = useState<any[]>(value);
  const [text, setText] = useState('');

  const handleOnRemove = (idx: number) => {
    if (!onChange) return;
    let newArray = [...items];
    newArray.splice(idx, 1);
    onChange(newArray);
    setItems(newArray);
  };

  const handleAdd = () => {
    if (!onChange) return;
    const val = arrayType === 'number' ? parseInt(text) : text;
    let newArray = [...items, val];
    onChange(newArray);
    setItems(newArray);
    setText('');
  };

  return (
    <div className="flex flex-col bg-white border border-gray-300 shadow-md rounded divide-y divide-gray-300">
      {items.map((item, index) => (
        <div className="flex items-center px-3" key={index}>
          <span className="text-gray-600 py-2 w-full truncate">
            {index}. {item}
          </span>
          {onChange && (
            <svg
              onClick={() => handleOnRemove(index)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-red-400 cursor-pointer"
            >
              <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          )}
        </div>
      ))}
      {onChange && (
        <div className="flex items-center justify-between px-3">
          <div className="w-full py-1">
            <input
              type="text"
              className="border-none w-full focus:outline-none focus:border-none text-sm rounded-sm"
              placeholder="..."
              onChange={e => setText(e.target.value)}
              value={text}
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
