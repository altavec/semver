import * as core from '@actions/core'

export class Inputs {
  // install arguments
  static get source(): string | undefined {
    const result = core.getInput('source')
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

    return result
  }
}
