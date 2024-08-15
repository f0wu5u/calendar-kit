export default ({ config }) => ({
  ...config,
  name: "React Native Calendar Kit",
  slug: "react-native-calendar-kit",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
