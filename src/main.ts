import * as core from '@actions/core'
import * as os from 'os'
import * as path from 'path'
import {Inputs} from './settings'
import {exec} from '@actions/exec'

async function run(): Promise<void> {
  try {
    // install semver
    const installArgs = ['tool', 'install', '-g', 'mondo.semanticversioning']
    if (Inputs.toolVersion) {
      installArgs.push('--version', Inputs.toolVersion)
    }

    if (Inputs.source) {
      installArgs.push('--add-source', Inputs.source)
    }

    const exitCode = await exec('dotnet', installArgs, {ignoreReturnCode: true})
    if (exitCode > 1) {
      throw new Error('dotnet tool install failed.')
    }

    // Collect a JSON string of all the version properties.
    const args = ['diff', 'solution']
    if (Inputs.solution) {
      args.push(Inputs.solution)
    }

    if (Inputs.isDefaultBranch) {
      args.push('--no-version-suffix')
    }

    if (Inputs.versionSuffix) {
      args.push('--version-suffix', Inputs.versionSuffix)
    }

    if (Inputs.source) {
      args.push('--source', Inputs.source)
    }

    if (Inputs.increment) {
      args.push('--increment', Inputs.increment)
    }

    args.push(
      '--output',
      'Json',
      '--direct-download',
      '--package-id-regex',
      'Mondo',
      '--package-id-replace',
      'GeomaticTechnologies',
      '--nologo'
    )

    const toolPath = path.join(
      os.homedir(),
      '.dotnet',
      'tools',
      'dotnet-semver'
    )
    let versionJson = ''
    await exec(toolPath, args, {
      listeners: {
        stdout: (data: Buffer) => {
          versionJson += data.toString()
        }
      }
    })
    core.setOutput('versionJson', versionJson)

    // Break up the JSON into individual outputs.
    const versionProperties = JSON.parse(versionJson)
    for (const name in versionProperties) {
      core.setOutput(name, versionProperties[name])
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
