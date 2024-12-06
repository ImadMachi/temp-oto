/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  transpilePackages: ['three'],
  images: {
    domains: [
      // Products
      'm.media-amazon.com',
      'i5.walmartimages.com',
      'www.ikea.com',
      'images.samsung.com',
      'products.shureweb.eu',
      'images-cdn.ubuy.co.in',
      'cdn.supercommerce.io'
      // Categories
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/en/shipments/picking',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|fr|ar)',
        destination: '/:lang/shipments/picking',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|fr|ar|front-pages|favicon.ico|api)\\b)):path',
        destination: '/en/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
