module.exports = {
  reactStrictMode: false,
  generateBuildId: () => 'build',
  
  async redirects() {
    return [
      {
        source: '/collection',
        destination: '/collection/all',
        permanent: true,
      },
      {
        source: '/collection/:collectionID/token',
        destination: '/collection/:collectionID',
        permanent: true,
      },
    ]
  },

};