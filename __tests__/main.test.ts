import * as path from 'path'
import * as core from '@actions/core'

const testEnvVars = {
  'my var': '',
  'special char var \r\n];': '',
  'my var2': '',
  'my secret': '',
  'special char secret \r\n];': '',
  'my secret2': '',
  PATH: `path1${path.delimiter}path2`,

  // Set inputs
  INPUT_SOLUTION: 'src/Math.sln',
  INPUT_MISSING: '',
  'INPUT_SPECIAL_CHARS_\'\t"\\': '\'\t"\\ response ',
  INPUT_MULTIPLE_SPACES_VARIABLE: 'I have multiple spaces',

  // Save inputs
  STATE_TEST_1: 'state_val'
}

describe('@actions/semver', () => {
  beforeEach(() => {
    for (const key in testEnvVars)
      process.env[key] = testEnvVars[key as keyof typeof testEnvVars]

    process.stdout.write = jest.fn()
  })

  afterEach(() => {
    for (const key in testEnvVars) Reflect.deleteProperty(testEnvVars, key)
  })

  it('gets an input', () => {
    expect(core.getInput('solution')).toBe('src/Math.sln')
  })
})
