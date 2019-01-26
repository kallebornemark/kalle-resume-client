module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].hash = true;
      return args;
    });

    const svgRule = config.module.rule("svg");

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear();

    // add replacement loader(s)
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '~@/styles/vars.scss';
          @import '~@/styles/mixins.scss';
          @import '~@/styles/dialog.scss';
        `
      }
    }
  }
};
