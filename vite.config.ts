import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import type { UserConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

const config: UserConfig = {
	envPrefix: ['VITE_', 'CONTENTFUL_'],
	plugins: [houdini(), sveltekit(), WindiCSS()]
};

export default config;
