import { type Config } from 'tailwindcss';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			},
			colors: {
				grasshopperGreen: {
					500: '#4ab93d',
					700: '#37942b',
					900: '#1f5d1a'
				},
				backgroundDark: {
					500: '#00040e'
				}
			}
		},
	},
	plugins: []
} satisfies Config;
