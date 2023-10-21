/** @type {import('next').NextConfig} */
const nextConfig = {
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
				hostname: 'bafybeifrbeic5jy2vsfke2fsrfacec7abyullnne5crl6buoellb2flgvm.ipfs.w3s.link',
				port: '',
				pathname: '/**',
			}
		],
	},
}

module.exports = nextConfig
