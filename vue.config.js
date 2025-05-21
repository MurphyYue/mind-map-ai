module.exports = {
  devServer: {
    compress: false,
    proxy: {
      '/api/ai': {
        target: 'https://ai.bobfintech.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api/ai': '/maas-api/api/app/completion/'
        }
      }
    }
  }
}
