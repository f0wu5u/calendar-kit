export default ({ config }) => ({
  ...config,
  name: "React Native Calendar Kit",
  slug: "@arbta/calendar-kit",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
