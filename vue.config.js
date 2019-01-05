module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '~@/styles/vars.scss';
          @import '~@/styles/mixins.scss';
        `
      }
    }
  }
};
