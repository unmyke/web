module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  // testRegex: '/**/*.(spec|test).(js|ts|tsx)',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
}
