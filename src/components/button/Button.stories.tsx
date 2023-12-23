import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../index';
import { useState } from 'react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FirstStory: Story = {
  render: () => {
    const [updated, setUpdated] = useState(false);

    return (
      <>
        <div>{updated ? 'updated' : 'not updated'}</div>
        <Button onClick={() => setUpdated((prev) => !prev)} backgroundColor="green" color="white">
          Test
        </Button>
      </>
    );
  },
};
