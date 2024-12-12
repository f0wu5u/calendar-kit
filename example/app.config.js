export default ({ config }) => ({
  ...config,
  name: "React Native Calendar Kit",
  slug: "@fowusu/calendar-kit",
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    supportsRTL: true,
  },
});
