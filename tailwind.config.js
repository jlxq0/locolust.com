module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
    'text-teal-400',
    'pt-4',
    'pb-4',
  ],
  darkMode: 'class',
  theme: {
    theme: {
      extend: {},
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
