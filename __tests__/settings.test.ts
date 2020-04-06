import {Inputs} from '../src/settings'

const testEnvVars = {
  INPUT_VERSIONSUFFIX: 'refs/heads/develop'
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

  it('gets the correct branch name', () => {
    expect(Inputs.versionSuffix).toBe('develop')
  })
})
