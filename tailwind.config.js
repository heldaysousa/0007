/** @type {import('tailwindcss').Config} */
    export default {
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#000000',
              light: '#1C1C1C',
            },
            accent: {
              DEFAULT: '#C0C0C0',
              purple: '#4B0082',
            },
            status: {
              error: '#8B0000',
              success: '#006400',
            },
            asphalt: {
              gray: '#1f2937'
            }
          },
          animation: {
            'fade-in': 'fadeIn 0.5s ease-in-out',
            'slide-up': 'slideUp 0.5s ease-out',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            slideUp: {
              '0%': { transform: 'translateY(20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
          },
        },
      },
      plugins: [
        require('tailwindcss-animate'),
        require('postcss-jit-props')({
          '--primary-color': '#000000',
          '--primary-light-color': '#1C1C1C',
          '--accent-color': '#C0C0C0',
          '--accent-purple-color': '#4B0082',
          '--status-error-color': '#8B0000',
          '--status-success-color': '#006400',
        })
      ],
    };
