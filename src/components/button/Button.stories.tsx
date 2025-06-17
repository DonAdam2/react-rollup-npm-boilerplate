import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const GreenButton: Story = {
  argTypes: { onClick: { action: 'Green button clicked' } },
  args: {
    children: 'Green Button',
    backgroundColor: '#4caf50',
    color: '#ffffff',
  },
};

export const RedButton: Story = {
  argTypes: { onClick: { action: 'Red button clicked' } },
  args: {
    children: 'Red Button',
    backgroundColor: '#e95a4b',
    color: '#ffffff',
  },
};
