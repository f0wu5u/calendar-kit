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
            "@fowusu/calendar-kit": "../src/index.ts",
          },
        },
      ],
    ],
  };
};
