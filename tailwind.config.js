import { theme } from './tailwind/theme';
import { colors } from './tailwind/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    ...theme,
    extend: {
      colors,
    },
  },
  plugins: [],
};
