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


## Creating new version

Details on versioning can be found here: https://github.com/actions/toolkit/blob/main/docs/action-versioning.md
Create a new release using the UI. Version format should be `v1.x.x`. Creating a new major version requires reaction from users and should be done only with breaking changes.
Once the new release is created, the v1 tag needs to be updated as well.
```
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

