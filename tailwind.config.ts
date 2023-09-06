import type {Config} from 'tailwindcss'

module.exports as Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                'main': '#9955FF',
                'gray-999': '#999999',
                'input': '#464648',
                'line': 'rgba(255,255,255,0.4)',
                'sourceCodeButton': 'rgba(255, 255, 255, 0.15)',
                'grayBg': 'rgba(36, 36, 38, 0.6)'


            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}