let settings = {
  purge: {
    enabled: true,
    content: ["./layouts/**/*.html"]
  },
  theme: {
    extend: {
      screens: {
        xs: "320px"
      }
    }
  },
  variants: {},
  plugins: []
};

if (process.env.NODE_ENV != 'production') {
  settings.purge.enabled = false;
}

module.exports = settings;
