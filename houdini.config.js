const headers = {
	Authorization: (env) => {
		return `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`;
	}
};

/** @type {import('houdini').ConfigFile} */
const config = {
	client: './src/client',
	plugins: { 'houdini-svelte': {} },
	scalars: {
		DateTime: {
			type: 'string'
		}
	},
	watchSchema: {
		headers: headers,
		url: 'https://graphql.contentful.com/content/v1/spaces/us4kti3xfg3y'
	}
};

export default config;
