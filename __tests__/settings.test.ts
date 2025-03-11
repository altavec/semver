import { Inputs } from '../src/settings.js'

describe('@actions/semver', () => {
  beforeEach(() => {
    process.stdout.write = jest.fn()
  })

  it('gets the correct branch name', () => {
    process.env['INPUT_VERSIONSUFFIX'] = 'refs/heads/develop'
    expect(Inputs.versionSuffix).toBe('develop')
  })

  it('gets the correct branch name with back slash', () => {
    process.env['INPUT_VERSIONSUFFIX'] = '\\refs\\heads\\develop'
    expect(Inputs.versionSuffix).toBe('develop')
  })

  it('gets the correct branch name from a feature branch', () => {
    process.env['INPUT_VERSIONSUFFIX'] = 'refs/heads/feature/action'
    expect(Inputs.versionSuffix).toBe('feature+action')
  })

  it('gets the correct increment', () => {
    process.env['INPUT_INCREMENT'] = 'ReleaseLabel'
    expect(Inputs.increment).toBe('ReleaseLabel')
  })
})
