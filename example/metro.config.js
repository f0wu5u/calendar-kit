const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { generate } = require("@storybook/react-native/scripts/generate");

generate({
  configPath: path.resolve(global.__dirname, "./.storybook"),
  useJs: true,
});

const defaultConfig = getDefaultConfig(global.__dirname);

const libSourcePath = path.resolve(global.__dirname, "..");

defaultConfig.watchFolders = [...defaultConfig.watchFolders, libSourcePath];
defaultConfig.resolver.alias = {
  "@code-fi/react-native-calendar-ui": path.resolve(
    libSourcePath,
    "src",
    "index.ts",
  ),
};

defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(global.__dirname, "node_modules"),
  path.resolve(libSourcePath, "node_modules"),
];

defaultConfig.resolver.disableHierarchicalLookup = true;
defaultConfig.transformer.unstable_allowRequireContext = true;
module.exports = defaultConfig;
