import {locales} from "../src/constants";

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  argTypes:{
    locale: {
      control: "select",
      options: locales,
    },
  },
  args:{
    locale: 'en-US'
  },
  decorators: [],
};

export default preview;
