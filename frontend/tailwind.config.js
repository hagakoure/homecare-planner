module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Принудительно сохраняем все dark-классы, которые используем
    'dark:bg-gray-800',
    'dark:bg-gray-700',
    'dark:bg-red-900/30',
    'dark:bg-yellow-900/30',
    'dark:bg-red-900/50',
    'dark:bg-yellow-900/50',
    'dark:bg-gray-600',
    'dark:text-white',
    'dark:text-gray-100',
    'dark:text-gray-200',
    'dark:text-gray-300',
    'dark:text-gray-400',
    'dark:text-red-200',
    'dark:text-yellow-200',
    'dark:border-gray-700',
    'dark:border-gray-600',
  ],
};