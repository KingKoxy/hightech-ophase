import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import type { UserConfig } from 'vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import WindiCSS from 'vite-plugin-windicss';

const config: UserConfig = {
	envPrefix: ['VITE_', 'CONTENTFUL_'],
	plugins: [
		nodePolyfills(),
		houdini(),
		sveltekit(),
		WindiCSS()
	]
};

export default config;
