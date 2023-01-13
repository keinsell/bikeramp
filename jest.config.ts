import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    // Do not expect coverage from modules, controllers and responses
    '!**/*.module.(t|j)s',
    '!**/*.response.(t|j)s',
    '!**/*.controller.(t|j)s',
    // Do not expect coverage from main.ts
    '!**/main.(t|j)s',
    // Do not expect coverage from prisma service
    '!**/prisma.service.(t|j)s',
    // Do not expect coverage from common files as they are just generics
    '!**/common/*.ts',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/', '<rootDir>/dist/'],
  coverageDirectory: '../coverage',
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary', 'html'],
  testEnvironment: 'node',
}

export default config
