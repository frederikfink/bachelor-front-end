module.exports = {
  reactStrictMode: false,
  target: "experimental-serverless-trace",
  generateBuildId: () => 'build',
  
  async redirects() {
    return [
      {
        source: '/collection',
        destination: '/collection/all',
        permanent: true,
      },
    ]
  },

};