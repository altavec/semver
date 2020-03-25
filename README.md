# GitHub Action for 

[![GitHub Actions status](https://github.com/MondoPower/semantic-versioning/workflows/CI/PR/badge.svg)](https://github.com/MondoPower/semantic-versioning/actions)

This action installs the CLI for [Mondo.SemanticVersioning](https://github.com/MondoPower/Mondo.SemanticVersioning)
and exposes version data from it as action outputs.

## Inputs

All inputs are optional.

|Name|Default|Description
|--|--|--|
`source`|null|The NuGet source that contains the tool as well as the packges to be versioned.
`toolVersion`|latest stable|The version of the nbgv dotnet CLI tool to install and use. If not specified, the default is the latest stable version.
`solution`|Repo root|The path to the version.
`isDefaultBranch`|false|Whether the current branch is the default branch
`versionSuffix`|null|The version suffix

## Outputs

Name | Description
--|--
Version|The full representation of the version include metadata.
VersionPrefix|The four integer version.
VersionSuffix|The metadata version.

## Example usage

### Using step outputs

```yaml
- uses: MondoPower/semantic-versioning@v0.1
  id: semver
- run: echo 'Version: ${{ steps.semver.outputs.Version }}'
```