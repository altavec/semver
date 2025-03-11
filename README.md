# GitHub Action for Semantic Versioning, Version 3

[![GitHub Actions status](https://github.com/altavec/semver/workflows/build-test/badge.svg)](https://github.com/altavec/semver/actions)

This action installs the CLI for
[Altvec.SemanticVersioning](https://github.com/altavec/SemanticVersioning) and
exposes version data from it as action outputs.

The main change from version 2 to version 3 is updating the NODE version to 20.
The main change from version 1 to version 2 is installing and using
`Altavec.SemanticVersioning` rather than `Mondo.SemanticVersioning`.

## Inputs

All inputs are optional.

| Name               | Default         | Description                                                                                                                                                                         |
| ------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`           | null            | The NuGet source that contains the tool as well as the packges to be versioned.                                                                                                     |
| `configfile`       | null            | The NuGet configuration file to use.                                                                                                                                                |
| `toolVersion`      | latest stable   | The version of the semantic version dotnet command-line tool to install and use. If not specified, the default is the latest stable version.                                        |
| `solution`         | repository root | The path to the solution.                                                                                                                                                           |
| `isDefaultBranch`  | false           | Whether the current branch is the default branch. Forces there to be no version suffix. This overrides `versionSuffix`.                                                             |
| `versionSuffix`    | null            | The prerelease value. If none is specified, the prerelease from the previous version is used.                                                                                       |
| `increment`        | 'Patch'         | Sets the location for the version increment. Can be either `Patch` to increment the patch value, or `ReleaseLabel` to increment the release label. Only valid for version >= 1.0.82 |
| `packageIdRegex`   | 'Altavec'       | The regular expression to match in the package ID                                                                                                                                   |
| `packageIdReplace` | 'Mondo'         | The text used to replace the match from `packageIdRegex`                                                                                                                            |
| `workingDirectory` | null            | The working directory to operate in. Only valid for version >= 2.2.0                                                                                                                |

## Outputs

| Name          | Description                                              |
| ------------- | -------------------------------------------------------- |
| Version       | The full representation of the version include metadata. |
| VersionPrefix | The four integer version.                                |
| VersionSuffix | The metadata version.                                    |

## Example usage

### Using step outputs

```yaml
- uses: altavec/semver@v3
  id: semver
  with:
    source: https://nuget.pkg.github.com/<ORG>/index.json
    configfile: ${{ github.workspace }}/src/nuget.config
    solution: ${{ env.SOLUTION_PATH }}
    isDefaultBranch: false
    versionSuffix: ${{ github.ref }}
    increment: ReleaseLabel
    packageIdRegex: Altavec
    packageIdReplace: Mondo
    workingDirectory: ${{ github.workspace }}
- run: echo 'Version: ${{ steps.semver.outputs.Version }}'
```

## Creating new version

Details on versioning can be found here:
[Action Versioning](https://github.com/actions/toolkit/blob/main/docs/action-versioning.md)
Create a new release using the UI. Version format should be `v2.x.x`. Creating a
new major version requires reaction from users and should be done only with
breaking changes. Once the new release is created, the v2 tag needs to be
updated as well.

```bash
git tag -fa v2 -m "Update v2 tag"
git push origin v2 --force
```
