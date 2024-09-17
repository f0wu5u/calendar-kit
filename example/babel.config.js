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
            "@f0wu5u/calendar-kit": "../src/index.ts",
          },
        },
      ],
    ],
  };
};
