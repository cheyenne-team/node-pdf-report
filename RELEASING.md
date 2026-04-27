# Release Process

This document describes how to create a new release of `nodejs-pdf-report`.

## Overview

Releases are automated using GitHub Actions. Pushing a version tag triggers the workflow, which validates the version, creates the package tarball, and publishes a GitHub Release with the `.tgz` as a downloadable asset.

## Steps to Create a Release

### 1. Update the Version

Edit `package.json` and update the version number following [semantic versioning](https://semver.org/):

```json
{
  "version": "1.2.0"
}
```

- **Major** (1.x.x): Breaking changes
- **Minor** (x.1.x): New features, backwards compatible
- **Patch** (x.x.1): Bug fixes, backwards compatible

### 2. Commit and Push

Commit your changes and push to the repository:

```bash
git add package.json
git commit -m "chore: bump version to 1.2.0"
git push
```

### 3. Create and Push the Tag

The tag **must** match the version in `package.json` exactly (prefixed with `v`). The workflow validates this and will fail if they don't match.

```bash
git tag v1.2.0
git push origin v1.2.0
```

That's it! Pushing the tag automatically triggers the release workflow. The workflow will:

- Validate the tag matches `package.json` version
- Create the package tarball (`npm pack`)
- Create a GitHub Release with the `.tgz` asset
- Send a Slack notification to `#gh-actions`

### Manual Trigger (Alternative)

You can also trigger the workflow manually from the GitHub Actions tab:

1. Go to the **Actions** tab
2. Select the **Release** workflow
3. Click **Run workflow**
4. Choose the branch (e.g., `develop`)
5. Optionally check "Create as draft release"
6. Click **Run workflow**

> **Note:** When triggering manually, the version is read from `package.json` and the tag is created automatically. Make sure the version has been bumped before running.

## Workflow Details

| Aspect | Configuration |
|--------|---------------|
| **Runner** | GitHub-hosted (`ubuntu-latest`) |
| **Trigger** | `push` of tag matching `v*` (automatic) + `workflow_dispatch` (manual) |
| **Version source** | `package.json` `version` field |
| **Tag format** | `v{version}` (e.g., `v1.2.0`) |
| **Output** | `.tgz` tarball uploaded as GitHub Release asset |
| **Notifications** | Slack `#gh-actions` channel on success and failure |

## Using the Release

### Download the Package

```bash
curl -LO https://github.com/cheyenne-team/node-pdf-report/releases/download/v1.2.0/nodejs-pdf-report-1.2.0.tgz
```

### Install from URL

```bash
npm install https://github.com/cheyenne-team/node-pdf-report/releases/download/v1.2.0/nodejs-pdf-report-1.2.0.tgz
```

### Install from Local Tarball

```bash
npm install ./nodejs-pdf-report-1.2.0.tgz
```

## Troubleshooting

### Tag and Version Mismatch

If the tag doesn't match `package.json` version, the workflow will fail with an error like:

```
Tag 'v1.2.0' does not match package.json version '1.1.7'
```

**Fix:** Make sure both match. Either update `package.json` to the intended version, or create the tag with the correct version.

### Release Already Exists

If a release with the same version already exists:

1. Delete the existing release and tag on GitHub
2. Update the version in `package.json` to a new version
3. Push the new tag

### Draft Releases

To create a draft release (for review before publishing):

1. Use the manual `workflow_dispatch` trigger (not tag push)
2. Check "Create as draft release"
3. Go to the Releases page after the workflow completes
4. Review and edit the release notes
5. Click **Publish release** when ready

## Notes

- The repository is public — all releases and assets are publicly accessible
- Release notes are auto-generated with installation instructions
- You can edit release notes after creation on the GitHub Releases page
