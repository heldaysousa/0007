export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-jit-props': {
          '--primary-color': '#000000',
          '--primary-light-color': '#1C1C1C',
          '--accent-color': '#C0C0C0',
          '--accent-purple-color': '#4B0082',
          '--status-error-color': '#8B0000',
          '--status-success-color': '#006400',
        },
        cssnano: {
          preset: 'default',
        },
      },
    };
