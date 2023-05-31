module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundImage: {
      login: "url('/login/banner2.png')",
      banner_wide: "url('/homepageImages/banner-wide.png')",
    },
    extend: {
      aspectRatio: {
        'custom': '16 / 11',
      },

      animation: {
        fade: 'fadeIn 1s ease',
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),

      screens: {
        "sm": "500px",
        'md': '750px',
        'lg': "1000px",
        'xl': "1300px",
        '2xl': "1600px"
      },
      colors: {
        'github': '#24292F',
        "color": "#414a4c",
        "theme": "#13274F",
        "button": "#5072A7",
        "button_hover": "#93c5fd",
        
      },
      fontFamily: {
        body: ['Pushster'],
        footer: ['Inter'],
        theme: ['Poppins'],
        arial: ['Arial'],
        manrope: ['Manrope'],
        delius: ['Delius Unicase'],
        inter: ['Inter'],
        poppins: ['Poppins'],
        DMsans: ['DM Sans'],
        Opensans: ['Open Sans'],
        SFuiDisplay: ['SF UI Display'],
        Abhayalibre: ['Abhaya Libre'],
        Dancing: ['Dancing Script'],
      }
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')]
}
