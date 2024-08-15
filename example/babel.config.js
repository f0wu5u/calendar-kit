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
            "react-native-one-calendar": "../src/index.ts",
          },
        },
      ],
    ],
  };
};
