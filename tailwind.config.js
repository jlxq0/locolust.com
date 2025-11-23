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
    'rounded-t-lg',
    'rounded-b-lg',
    'text-teal-500',
    'dark:text-teal-400',
    // Flyout menu classes (used by CSS hover and JS enhancement)
    'opacity-0',
    'opacity-100',
    'invisible',
    'visible',
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
