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
export const ReadOnly = Template.bind({});

const props: IClientCms<any> = {
  fields: [
    {
      name: 'title',
      validate: text =>
        text.length > 4
          ? true
          : {
              error: 'Text is to short',
            },
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'total',
      type: 'number',
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
      name: 'myDate',
      type: 'date',
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
      of: 'number',
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

const readOnlyProps: IClientCms<any> = {
  fields: props.fields.map(field => ({
    ...field,
    disabled: true,
  })),
};

Default.args = props;
ReadOnly.args = readOnlyProps;
