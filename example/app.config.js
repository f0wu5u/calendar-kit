export default ({ config }) => ({
  ...config,
  name: "React Native Calendar UI",
  slug: "react-native-calendar-ui",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
