export default ({ config }) => ({
  ...config,
  name: "React Native Calendar Kit",
  slug: "@fowusu/calendar-kit",
  newArchEnabled: true,
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    supportsRTL: true,
  },
});
