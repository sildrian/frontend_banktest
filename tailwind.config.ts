import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285f4',
          red: '#ea4335',
          yellow: '#fbbc05',
          green: '#34a853',
        },
      },
    },
  },
  plugins: [],
};

export default config;