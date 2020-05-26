# GitHub Action for Semantic Versioning

[![GitHub Actions status](https://github.com/MondoPower/semantic-versioning/workflows/build-test/badge.svg)](https://github.com/MondoPower/semantic-versioning/actions)

This action installs the CLI for [Mondo.SemanticVersioning](https://github.com/MondoPower/Mondo.SemanticVersioning) and exposes version data from it as action outputs.

## Inputs

All inputs are optional.

| Name              | Default       | Description                                                  |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `source`          | null          | The NuGet source that contains the tool as well as the packges to be versioned. |
| `toolVersion`     | latest stable | The version of the semantic version dotnet CLI tool to install and use. If not specified, the default is the latest stable version. |
| `solution`        | Repo root     | The path to the solution.                                    |
| `isDefaultBranch` | false         | Whether the current branch is the default branch. Forces there to be no version suffix. This overrides `versionSuffix`. |
| `versionSuffix`   | null          | The pre-release value. If none is specified, the pre-release from the previous version is used. |

## Outputs

| Name          | Description                                              |
| ------------- | -------------------------------------------------------- |
| Version       | The full representation of the version include metadata. |
| VersionPrefix | The four integer version.                                |
| VersionSuffix | The metadata version.                                    |

## Example usage

### Using step outputs

```yaml
- uses: MondoPower/semantic-versioning@v0.1
  id: semver
  with:
    source: https://nuget.pkg.github.com/<ORG>/index.json
    solution: ${{ env.SOLUTION_PATH }}
    isDefaultBranch: false
    versionSuffix: ${{ github.ref }}
- run: echo 'Version: ${{ steps.semver.outputs.Version }}'
```

