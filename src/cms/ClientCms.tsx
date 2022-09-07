import { Input } from 'antd';
import React from 'react';
import { IClientCms, IClientCmsField } from './types';
import LabelContainer from './LabelContainer';

const ClientCms: React.FC<IClientCms> = <T,>({ fields }: IClientCms<T>) => {
    return (
        <div className="max-w-xl h-96 flex flex-col gap-y-4 w-full">
            {fields.map((field, fieldIdx) => (
                <LabelContainer
                    key={fieldIdx}
                    label={field.label || field.name}
                >
                    <Component field={field} />
                </LabelContainer>
            ))}
        </div>
    );
};

const Component = ({ field }: { field: IClientCmsField }) => {
    const type = field.type;
    const props = type.props ? type.props : ({} as any);
    switch (type.type) {
        case 'text':
            return <Input.TextArea {...props} />;
        default:
            return <Input className="w-full" />;
    }
};

export default ClientCms;
