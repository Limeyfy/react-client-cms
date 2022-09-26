import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ClientCms, IClientCms } from '../src';

const meta: Meta = {
  title: 'Client Cms',
  component: ClientCms,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<IClientCms<any>> = args => <ClientCms<any> {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const props: IClientCms<any> = {
  fields: [
    {
      name: 'title',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'total',
      type: 'number',
      rules: {
        required: true,
        min: 0,
        max: 100,
      },
    },
    {
      name: 'selectBox',
      type: 'select',
      options: [
        {
          value: '1',
          label: 'One',
        },
        {
          value: '2',
          label: 'Two',
        },
      ],
      renderLabel: (option: any) => option.label,
      nullValueText: 'Select an option',
    },
    {
      name: 'image',
      type: 'file',
    },
    {
      name: 'checkbox',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'myCoolObject',
      type: 'object',
      fields: [
        {
          name: 'subTitle',
          defaultValue: "I'm a default value",
        },
        {
          name: 'total',
          type: 'number',
        },
      ],
    },
    {
      name: 'myArray',
      type: 'array',
      arrayType: 'string',
      defaultValue: [5032, 2012],
    },
    {
      name: 'myObjectArray',
      type: 'object-array',
      fields: [
        {
          name: 'description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'quantity',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'price',
          type: 'number',
          defaultValue: 250,
        },
      ],
      renderLabel: (item: any) => item.subTitle,
    },
  ],
};

Default.args = props;
