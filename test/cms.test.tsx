import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ClientCms from '../src/cms/ClientCms';

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ClientCms
                fields={[
                    {
                        name: 'name',
                        type: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'date',
                        type: {
                            type: 'date',
                        },
                    },
                    {
                        name: 'boolean',
                        type: {
                            type: 'boolean',
                        },
                    },
                    {
                        name: 'file',
                        type: {
                            type: 'upload',
                        },
                    },
                    {
                        name: 'select',
                        type: {
                            type: 'select',
                            options: [
                                { label: 'Option 1', value: 'option1' },
                                { label: 'Option 2', value: 'option2' },
                            ],
                            getIdentify: (option) => option.value,
                            getLabel: (option) => option.label,
                        },
                    },
                ]}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
