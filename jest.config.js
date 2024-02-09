/** @type {import('jest').Config} */
const config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  rootDir: 'src',
  collectCoverage: true,
  coverageThreshold: { global: { branches: 100 } },
};

module.exports = config;
