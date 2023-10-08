import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import houdini from 'houdini/vite';

export default defineConfig({
	envPrefix: ['VITE_', 'CONTENTFUL_'],
	plugins: [houdini(), sveltekit(), WindiCSS()]
});
