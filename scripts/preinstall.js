/**
 * @fileoverview Pre-install script to check that the necessary dependencies are installed: Node 18+, Cargo
 * @module scripts/preinstall
 */

// if running in CI, exit with 0
if (process.env.CI) {
  process.exit(0)
}

// import dependencies
const childProcess = require('child_process')

// check node version
const nodeVersion = process.version.slice(1).split('.')
if (+nodeVersion[0] < 18) {
  console.error('Please make sure that your installed Node version is greater than v18')
  process.exit(1)
}

// check for cargo
try {
  childProcess.execSync('cargo --version')
} catch {
  console.error(
    'Could not find Cargo. Please make sure that Cargo and Rust is installed with https://rustup.rs'
  )
  process.exit(1)
}
