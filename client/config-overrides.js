const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: true,
      }) ]
    })
  };

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      "@border-radius-base"       : "4px",
      "@border-radius-sm"         : "2px",
      "@code-family"              : "Consolas, Menlo, Courier, monospace",
      "@component-background"     : "#1a2735",
      "@font-family"              : "Poppins, Roboto, Helvetica, sans-serif",
      "@font-family-no-number"    : "font-family: Poppins, Roboto, Helvetica, sans-serif",
      "@font-size-base"           : "16px",
      "@font-size-lg"             : "@font-size-base + 4px",
      "@font-size-sm"             : "12px",
      "@heading-color"            : "fade(#fff, 90%)",
      "@heading-color-dark"       : "fade(#fff, 100%)",
      "@line-height-base"         : "1.5",
      "@primary-color"            : "#001529",
      "@text-color"               : "fade(#fff, 85%)",
      "@text-color-dark"          : "fade(#fff, 95%)",
      "@text-color-secondary"     : "fade(#fff, 65%)",
      "@text-color-secondary-dark": "fade(#fff, 85%)",
    },
  })(config, env);

  return config;
}
