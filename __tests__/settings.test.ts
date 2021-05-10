import {Inputs} from '../src/settings'

describe('@actions/semver', () => {
  beforeEach(() => {
    process.stdout.write = jest.fn()
  })

  it('gets the correct branch name', () => {
    process.env['INPUT_VERSIONSUFFIX'] = 'refs/heads/develop'
    expect(Inputs.versionSuffix).toBe('develop')
  })

  it('gets the correct branch name ACT', () => {
    process.env['INPUT_VERSIONSUFFIX'] = '\\refs\\heads\\develop'
    expect(Inputs.versionSuffix).toBe('develop')
  })
})
