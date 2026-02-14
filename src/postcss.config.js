export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'last 4 versions',
        'Edge >= 18',
        'Firefox ESR',
        'not dead',
        'not IE 11',
        'iOS >= 12',
        'Safari >= 12'
      ],
      grid: 'autoplace',
      flexbox: 'no-2009'
    }
  }
}
