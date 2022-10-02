const headers = {
	Authorization: (env) => {
		return `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`;
	}
};

/** @type {import('houdini').ConfigFile} */
const config = {
	client: './src/client',
	apiUrl: 'https://graphql.contentful.com/content/v1/spaces/us4kti3xfg3y',
	scalars: {
		DateTime: {
			type: 'string'
		}
	},
	schemaPollHeaders: headers
};

export default config;
