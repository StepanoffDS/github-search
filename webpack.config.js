// make base url like /github-search/

module.exports = {
	devServer: {
		public: 'localhost:8080',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		historyApiFallback: true,
		port: 8080,
		proxy: {
			'/github-search/': {
				target: 'https://api.github.com/',
				secure: false,
				changeOrigin: true,
				pathRewrite: {
					'^/github-search/': '',
				},
			},
		},
	},
}
