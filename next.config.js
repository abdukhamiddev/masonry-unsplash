module.exports = {
	i18n: {
		locales: ["en-US"],
		defaultLocale: "en-US",
	},
	images: {
		domains: ["firebasestorage.googleapis.com", "ik.imagekit.io"],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};
