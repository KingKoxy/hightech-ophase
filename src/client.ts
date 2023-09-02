import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'https://graphql.contentful.com/content/v1/spaces/' + import.meta.env.CONTENTFUL_SPACE_ID,
	fetchParams() {
		return {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.CONTENTFUL_ACCESS_TOKEN}`
			}
		};
	}
});
