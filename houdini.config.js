function headers(env) {
	return { Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}` };
}

function url(env) {
	return 'https://graphql.contentful.com/content/v1/spaces/' + env.CONTENTFUL_SPACE_ID;
}

/** @type {import('houdini').ConfigFile} */
const config = {
	plugins: {
		'houdini-svelte': {
			client: './src/lib/client.ts'
		}
	},
	scalars: {
		DateTime: {
			type: 'string'
		}
	},
	watchSchema: {
		url: url,
		headers: headers
	}
};

export default config;
