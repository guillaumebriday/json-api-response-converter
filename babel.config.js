module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'cjs'
          }
        ]
      ]
    },
    build: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
}
