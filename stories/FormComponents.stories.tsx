import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TextInput as TextInputComponent,
  IClientCmsInputPropsDetailed,
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

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const TextInput = StoryTextInput.bind({});
export const ErrorMessage = StoryErrorMessage.bind({});

TextInput.args = {};
ErrorMessage.args = {};
