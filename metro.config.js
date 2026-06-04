// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Tu archivo global.css está dentro de src/app/
module.exports = withNativeWind(config, { input: "./src/app/global.css" });
