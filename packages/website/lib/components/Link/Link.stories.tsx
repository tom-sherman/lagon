import { ComponentStory, ComponentMeta } from '@storybook/react';
import Link from '.';

export default {
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = args => (
  <Link href="google.com" {...args}>
    A link
  </Link>
);

export const Default = Template.bind({});

export const Target = Template.bind({});
Target.args = {
  target: '_blank',
};
