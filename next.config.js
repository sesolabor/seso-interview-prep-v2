// See: https://github.com/vercel/next.js/issues/8106
const withSourceMaps = require("@zeit/next-source-maps")();
const path = require("path");
// See: https://flaviocopes.com/nextjs-analyze-app-bundle/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withSourceMaps({
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    async rewrites() {
      // Part of powering client-side routing.
      // See: https://colinhacks.com/essays/building-a-spa-with-nextjs
      return [
        // Rewrite everything else to use `pages/index`
        {
          source: "/api/:path*",
          destination: "/api/:path*",
        },
        {
          source: "/:path*",
          destination: "/",
        },
      ];
    },
    webpack: (config, options) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: "empty",
      };
      // Ant Design Configs
      // See: https://github.com/vercel/next.js/issues/9830#issuecomment-636509363
      if (options.isServer) {
        const antStylesRegex = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStylesRegex)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStylesRegex,
          use: "null-loader",
        });
      } else {
        /* aliases ant icon imports to user-defined icons folder */
        config.resolve.alias = {
          ...config.resolve.alias,
          "@ant-design/icons/lib/dist$": path.resolve(`./components/icons.ts`),
        };
        /* strips out moment locales */
        // config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));
      }

      return config;
    },
  })
);
