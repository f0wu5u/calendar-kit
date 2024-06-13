module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@code-fi/react-native-calendar-ui": "../src/index.ts",
          },
        },
      ],
    ],
  };
};
