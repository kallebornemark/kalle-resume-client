module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://kalle-resume-api.now.sh',
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
