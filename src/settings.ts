import * as core from '@actions/core'

export class Inputs {
  // install arguments
  static get source(): string | undefined {
    const result = core.getInput('source')
    return result === '' || result === null ? undefined : result
  }

  static get configfile(): string | undefined {
    const result = core.getInput('configfile')
    return result === '' || result === null ? undefined : result
  }

  static get toolVersion(): string | undefined {
    const result = core.getInput('toolVersion')
    return result === '' || result === null ? undefined : result
  }

  // run arguments
  static get solution(): string | undefined {
    const result = core.getInput('solution')
    return result === '' || result === null ? undefined : result
  }

  static get isDefaultBranch(): boolean {
    return core.getInput('isDefaultBranch') === 'true'
  }

  static get versionSuffix(): string | undefined {
    let result = core.getInput('versionSuffix')
    if (result === '' || result === null) {
      return undefined
    }

    if (result.startsWith('refs/')) {
      result = result.replace('refs/heads/', '')
    } else if (result.startsWith('\\refs\\')) {
      result = result.replace('\\refs\\heads\\', '')
    }

    if (result.includes('/')) {
      result = result.replace('/', '+')
    } else if (result.includes('\\')) {
      result = result.replace('\\', '+')
    }

    return result
  }

  static get increment(): string | undefined {
    const result = core.getInput('increment')
    return result === '' || result === null ? undefined : result
  }

  static get packageIdRegex(): string {
    const result = core.getInput('packageIdRegex')
    return result === '' || result === null ? 'Altavec' : result
  }

  static get packageIdReplace(): string {
    const result = core.getInput('packageIdReplace')
    return result === '' || result === null ? 'Mondo' : result
  }

  static get workingDirectory(): string | undefined {
    const result = core.getInput('workingDirectory')
    return result === '' || result === null ? undefined : result
  }
}
