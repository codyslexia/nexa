/**
 * @fileoverview Checks that the lock file is valid.
 * @module scripts/check-lock-file
 */

const fs = require('fs')

const INVALID_LOCK_FILE =
  '❌ Invalid occurence of "package-lock.json" or "yarn.lock" files. Please remove it and use only "pnpm-lock.yaml"'
const INVALID_PNPM_LOCK_FILE =
  '❌ The "pnpm-lock.yaml" has reference to local repository ("localhost:4873"). Please use ensure you disable local registry before running "pnpm install"'

const INVALID_TARBALL =
  '❌ The "pnpm-lock.yaml" has reference to tarball package. Please use npm registry only'

const MISSING_PNPM_LOCK_FILE = '❌ The "pnpm-lock.yaml" does not exist or cannot be read'

function checkLockFiles() {
  const errors = []

  if (fs.existsSync('package-lock.json') || fs.existsSync('yarn.lock')) {
    errors.push(INVALID_LOCK_FILE)
  }

  try {
    const content = fs.readFileSync('pnpm-lock.yaml', 'utf-8')
    if (content.match(/localhost:487/)) errors.push(INVALID_PNPM_LOCK_FILE)
    if (content.match(/resolution: \{tarball/)) errors.push(INVALID_TARBALL)
  } catch {
    errors.push(MISSING_PNPM_LOCK_FILE)
  }
  return errors
}

console.log('🐋 Validating %clock%c files', 'color: white', 'color:default')

const invalid = checkLockFiles()

if (invalid.length > 0) {
  invalid.forEach((e) => console.log(e))
  process.exit(1)
} else {
  console.log('%c✔%c Lock file is valid\n', 'color: green', 'color: default')
  process.exit(0)
}
