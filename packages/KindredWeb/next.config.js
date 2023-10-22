/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: config => {
		config.resolve.fallback = {fs: false, net: false, tls: false}
		config.externals.push('pino-pretty', 'lokijs', 'encoding')
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/f/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '**.ipfs.w3s.link',
				port: '',
				pathname: '/**',
			}
		],
	},
}

module.exports = nextConfig
