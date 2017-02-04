#!/usr/bin/env node

/**
 * @fileoverview pre-commit hook that checks if staged package.json and
 * yarn.lock deps are in sync.
 */

const { execSync } = require('child_process');
const { isEqual } = require('lodash.isequal');
const updatedNpmManifesto = require('../../package.json');

const npmManifesto = 'package.json';
const yarnManifesto = 'yarn.lock';


if (isFileStaged(npmManifesto)) {
  const previousNpmManifesto = JSON.parse(
      execSync(`git show HEAD:${npmManifesto}`)
  );

  const depsFields = ['dependencies', 'devDependencies', 'peerDependencies'];

  const hasDepsChanges = depsFields.some(field => isEqual(
      updatedNpmManifesto[field], previousNpmManifesto[field]
  ));


  if (hasDepsChanges) {
    // We assume that if the yarn manifesto is staged then the deps match.
    if (!isFileStaged(yarnManifesto)) {
      throw new Error(
          `You modified ${npmManifesto} but didn't update ${yarnManifesto}`
      );
    }
  }
}


function isFileStaged(file) {
  const changedFiles = execSync(
      'git diff --cached --name-only --diff-filter=ACM'
  );

  return new RegExp(`^${file}$`, 'm').test(changedFiles);
}
