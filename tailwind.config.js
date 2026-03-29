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
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.35rem, 5vw, 4.35rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        title: ['clamp(1.65rem, 2.6vw, 2.35rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.025rem, 1.25vw, 1.25rem)', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.7' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
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
