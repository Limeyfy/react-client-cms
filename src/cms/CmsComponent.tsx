import React, { useState } from 'react';
import { formatForm } from './cms-functions';
import CmsInputField from './CmsInputField';
import { ICms, ICmsField } from './CmsTypes';

const CmsComponent = (props: ICms) => {
  const [form, setForm] = useState(props.fields);

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

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formatForm(form));
  };

  return (
    <div>
      <form className="mx-8 my-6" onSubmit={submit}>
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
