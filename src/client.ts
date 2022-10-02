import { HoudiniClient, type RequestHandlerArgs } from '$houdini';

const headers: Record<string, string> = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${import.meta.env.CONTENTFUL_ACCESS_TOKEN}`
};

async function fetchQuery({ fetch, text = '', variables = {}, metadata }: RequestHandlerArgs) {
	const url =
		'https://graphql.contentful.com/content/v1/spaces/' + import.meta.env.CONTENTFUL_SPACE_ID;
	const result = await fetch(url, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			query: text,
			variables
		})
	});
	return await result.json();
}

export default new HoudiniClient(fetchQuery);
