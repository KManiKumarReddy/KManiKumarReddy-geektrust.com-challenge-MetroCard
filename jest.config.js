/** @type {import('jest').Config} */
const config = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
        },
      },
    ],
  },
  rootDir: 'src',
  collectCoverage: true,
  coverageThreshold: { global: { branches: 100 } },
};

module.exports = config;
