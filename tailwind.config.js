/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg-primary)',
        surface: 'var(--color-surface-white)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        green: {
          primary: 'var(--color-green-primary)',
          secondary: 'var(--color-green-secondary)',
          deep: 'var(--color-green-deep)',
          mint: 'var(--color-green-mint)',
        },
        yellow: {
          solar: 'var(--color-solar-yellow)',
          highlight: 'var(--color-warm-highlight)',
        },
        border: 'var(--color-border-soft)',
      },
      fontFamily: {
        sans: [
          '"Avenir Next"',
          '"Segoe UI"',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['clamp(2.6rem, 5.8vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.042em' }],
        title: ['clamp(1.85rem, 2.9vw, 2.65rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.06rem, 1.45vw, 1.34rem)', { lineHeight: '1.72', letterSpacing: '-0.01em' }],
        body: ['1rem', { lineHeight: '1.78', letterSpacing: '-0.006em' }],
        caption: ['0.9rem', { lineHeight: '1.55', letterSpacing: '0.01em' }],
      },
      borderRadius: {
        medium: '1rem',
        large: '1.5rem',
      },
      boxShadow: {
        level1: '0 8px 28px rgba(30, 52, 34, 0.08)',
        level2: '0 18px 48px rgba(22, 44, 28, 0.14)',
      },
    },
  },
  plugins: [],
}
