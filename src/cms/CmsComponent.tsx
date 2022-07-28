import React, { useContext, useEffect, useState } from 'react';
import { buildForm, formatForm } from './cms-functions';
import CmsInputField from './CmsInputField';
import { CmsContext } from './CmsProvider';
import { ICms, ICmsField } from './CmsTypes';

const CmsComponent = ({ fields, onSubmit }: ICms) => {
  const [form, setForm] = useState<ICmsField[]>([]);

  const contextState = useContext(CmsContext);

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

  return (
    <div>
      <form className="mx-8 my-6" onSubmit={e => onSubmit(e, formatForm(form))}>
        {form.map((field, idx) => {
          if (field.type === 'text' && contextState.components?.textComponent) {
            return contextState.components.textComponent(field, event =>
              handleInputChange(event, field.name)
            );
          }
          return (
            <CmsInputField
              key={idx}
              field={field}
              onChange={e => handleInputChange(e, field.name)}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CmsComponent;
