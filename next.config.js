const path = require('path')

const withImages = require('next-images')

const withTM = require('next-transpile-modules')([
  'antd-mobile',
])

const nextConfig = {
  images: {
    // formats: ['image/svg', 'image/webp', 'image/png', 'image/jpg'],
    disableStaticImages: true
  },

  // distDir: "dist",
  // 你项目中其他的 Next.js 配置
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  }
}

module.exports = withTM(withImages(nextConfig))
