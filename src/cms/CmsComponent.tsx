import React, { useState } from 'react';
import { formatForm } from './cms-functions';
import CmsInputField from './CmsInputField';
import { ICms, ICmsField } from './CmsTypes';

const CmsComponent = ({ fields, onSubmit }: ICms) => {
  const [form, setForm] = useState(fields);

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

  return (
    <div>
      <form className="mx-8 my-6" onSubmit={e => onSubmit(e, formatForm(form))}>
        {form.map((field, idx) => (
          <CmsInputField
            key={idx}
            field={field}
            onChange={e => handleInputChange(e, field.name)}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CmsComponent;
