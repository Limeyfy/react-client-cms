import React from 'react';
import CmsInputField from './CmsInputField';
import { ICms } from './CmsTypes';

const CmsComponent = (props: ICms) => {
  return (
    <div>
      <form className="mx-8 my-6">
        {props.fields.map(field => (
          <CmsInputField key={field.name} field={field} />
        ))}
      </form>
    </div>
  );
};

export default CmsComponent;
