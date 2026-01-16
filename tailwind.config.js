export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-bg': '#f0f4f8', // Cool slate/blue tint
                'brand-ink': '#1e293b', // Slate 800 - Deep and readable
                'brand-accent': '#d90429', // Strong Red
            },
            fontFamily: {
                sans: ['Lato', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            }
        },
    },
    plugins: [],
}
