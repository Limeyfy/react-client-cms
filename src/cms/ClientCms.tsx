import React from 'react';
import { IClientCms } from './types';
import 'antd/dist/antd.css';

const ClientCms: React.FC<IClientCms> = <T,>({}: IClientCms<T>) => {
    return <div className="bg-red-500 max-w-xl h-96"></div>;
};

export default ClientCms;
