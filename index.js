const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ theme, addBase }) {
    if (process.env.npm_lifecycle_script.includes('--build') || process.env.NODE_ENV === 'production') return;

    const screens = theme('screens', {});
    const breakpointsSorted = Object.entries(screens).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
    const breakpoints = breakpointsSorted.reverse();

    addBase({
        'body::after': {
            content: `"Default (< ${breakpoints[0][1]})"`,
            position: 'fixed',
            right: '8px',
            bottom: '8px',
            padding: '8px 8px 8px 32px',
            background: 'no-repeat 8px center / 18px url(https://tailwindcss.com/favicons/favicon-32x32.png), #edf2f7',
            border: '1px solid #cbd5e0',
            color: '#d53f8c',
            fontSize: '12px',
            fontFamily: 'Verdana',
            fontWeight: '600',
            zIndex: '99999',
        },
        ...breakpoints.reduce((acc, current) => {
            acc[`@media (min-width: ${current[1]})`] = {
                'body::after': {
                    content: `"${current[0]} (${current[1]})"`,
                },
            };
            return acc;
        }, {}),
    });
});
