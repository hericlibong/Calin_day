export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-dark': '#1a1a1a',
                'brand-gray': '#f5f5f5',
                'brand-accent': '#e63946', // A soft red for the 'Câlin'/heart theme maybe, or keep it neutral
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'Georgia', 'serif'],
            }
        },
    },
    plugins: [],
}
