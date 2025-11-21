# Release Process

This document describes how to create a new release of `nodejs-pdf-report`.

## Overview

Releases are automated using GitHub Actions. The workflow builds the project, creates a GitHub release, and uploads the package tarball (.tgz) with a publicly accessible download URL.

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

### 2. Commit and Push Changes

Commit your changes and push to the `master` branch:

```bash
git add package.json
git commit -m "chore: bump version to 1.2.0"
git push origin master
```

### 3. Trigger the Release Workflow

1. Go to the GitHub repository: https://github.com/cheyenne-team/node-pdf-report
2. Click on the **Actions** tab
3. Select the **Release** workflow from the left sidebar
4. Click the **Run workflow** button
5. Choose the branch (usually `master`)
6. Optionally check "Create as draft release" if you want to review before publishing
7. Click **Run workflow**

### 4. Monitor the Workflow

The workflow will:
- ✅ Check out the code
- ✅ Install dependencies
- ✅ Run the build process
- ✅ Create the package tarball
- ✅ Create a GitHub release with the version from package.json
- ✅ Upload the .tgz file as a release asset

You can monitor the progress in the Actions tab.

### 5. Get the Download URL

Once the workflow completes, the tarball will be available at:

```
https://github.com/cheyenne-team/node-pdf-report/releases/download/v{VERSION}/nodejs-pdf-report-{VERSION}.tgz
```

For example, version 1.2.0:
```
https://github.com/cheyenne-team/node-pdf-report/releases/download/v1.2.0/nodejs-pdf-report-1.2.0.tgz
```

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

### Workflow Fails on Build

If the build fails:
1. Check the workflow logs in the Actions tab
2. Fix any build errors in your code
3. Commit and push the fixes
4. Run the workflow again

### Release Already Exists

If a release with the same version already exists:
1. Delete the existing release and tag on GitHub
2. Or update the version in package.json to a new version
3. Run the workflow again

### Missing Build Files

If you see errors about missing TypeScript config or Gulp files, ensure:
- All build dependencies are listed in `package.json`
- The build process runs successfully locally: `npm run build`

## Draft Releases

To create a draft release (for review before publishing):
1. Check "Create as draft release" when running the workflow
2. Go to the Releases page after the workflow completes
3. Edit the release notes if needed
4. Click "Publish release" when ready

## Notes

- The repository is public, so all releases and assets are publicly accessible
- The workflow automatically tags the release with `v{VERSION}` format
- Release notes are auto-generated with installation instructions
- You can edit release notes after creation on the GitHub Releases page
