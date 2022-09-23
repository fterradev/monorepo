const tsConfig = require("./jsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,

  /**
   * This is useful to ensure the module resolution works regardless of the directory node is run from.
   * Note: in case node is run from this very directory, it works regardless of this parameter.
   */
  cwd: __dirname,
});
