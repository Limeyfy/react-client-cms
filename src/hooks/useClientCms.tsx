import React from 'react';
import { IClientCmsContext } from '../client-cms';

const useClientCms = (id?: string) => {
  const context = React.useContext(IClientCmsContext);

  const error = React.useMemo(() => context.errors.find(x => x.id === id), [
    id,
    context.errors,
  ]);

  return {
    ...context,
    error,
  };
};

export default useClientCms;
