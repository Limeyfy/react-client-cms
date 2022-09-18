import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TextInput as TextInputComponent,
  IClientCmsInputPropsDetailed,
  CheckBoxProps,
  CheckBox,
  FileInput as FileInputComponent,
  SelectComponent,
  IClientCmsSelectField,
} from '../src';
import {
  ErrorMessage as ErrorMessageComponent,
  ErrorMessageProps,
} from '../src/components/ErrorMessage';

const meta: Meta = {
  title: 'Components',
  component: TextInputComponent,
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

const StoryTextInput: Story<IClientCmsInputPropsDetailed> = args => (
  <TextInputComponent {...args} />
);
const StoryErrorMessage: Story<ErrorMessageProps> = args => (
  <ErrorMessageComponent {...args} />
);

const SBCheckbox: Story<CheckBoxProps> = args => <CheckBox {...args} />;

const SBFileInput: Story<IClientCmsInputPropsDetailed> = args => (
  <FileInputComponent files={null} {...args} />
);
const SBSelect: Story<IClientCmsSelectField<any>> = args => (
  <SelectComponent {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const TextInput = StoryTextInput.bind({});
export const ErrorMessage = StoryErrorMessage.bind({});
export const Checkbox = SBCheckbox.bind({});
export const FileInput = SBFileInput.bind({});
export const Select = SBSelect.bind({});

TextInput.args = {};
ErrorMessage.args = {};
Checkbox.args = {
  label: 'Checkbox',
};
Select.args = {
  options: ['option 1', 'option 2', 'option 3'],
  renderLabel: (option: any) => option,
};
