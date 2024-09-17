export default ({ config }) => ({
  ...config,
  name: "React Native Calendar Kit",
  slug: "@f0wu5u/calendar-kit",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    supportsRTL: true
  },
});
