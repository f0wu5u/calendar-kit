export default ({ config }) => ({
  ...config,
  name: "React Native One Calendar",
  slug: "react-native-one-calendar",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
