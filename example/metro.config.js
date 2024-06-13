/* eslint-disable no-undef */

const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { generate } = require("@storybook/react-native/scripts/generate");

generate({
  configPath: path.resolve(__dirname, "./.storybook"),
  useJs: true,
});

const defaultConfig = getDefaultConfig(__dirname);

const libSourcePath = path.resolve(__dirname, "..");

defaultConfig.watchFolders = [...defaultConfig.watchFolders, libSourcePath];
defaultConfig.resolver.alias = {
  "@code-fi/react-native-calendar-ui": path.resolve(
    libSourcePath,
    "src",
    "index.ts",
  ),
};

defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(libSourcePath, "node_modules"),
];

defaultConfig.resolver.disableHierarchicalLookup = true;
defaultConfig.transformer.unstable_allowRequireContext = true;
module.exports = defaultConfig;
