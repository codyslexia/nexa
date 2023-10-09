#!/usr/bin/env node

/**
 * @fileoverview Installs Apollo Rover CLI binary.
 * @module scripts/install-apollo-rover
 * @see {@link https://www.apollographql.com/docs/rover/getting-started/}
 */

const fs = require('fs')
const os = require('os')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Derives runner's name from `__filename`.
 * @example
 * console.log(__filename) // '/urs/dev/nexa/app/scripts/my-script.js'
 * const runner = 'scripts/my-script.js'
 */
const runner = __filename.split(process.cwd()).pop().slice(1)

async function installApolloRover() {
  const targetDirectory = '.rover/bin/rover'
  const binaryPath = path.join(os.homedir(), targetDirectory)

  // check if binary already exists
  if (fs.existsSync(binaryPath)) {
    console.log(
      JSON.stringify({
        runner,
        message: `Apollo Rover binary already exists at '${binaryPath}'. Skipping installation.`,
        timestamp: new Date().toISOString(),
      })
    )
    return
  }

  console.log(
    JSON.stringify({
      runner,
      message: `Installing Apollo Rover at '${binaryPath}'`,
      timestamp: new Date().toISOString(),
    })
  )

  try {
    execSync(`curl -sSL -o /dev/null https://rover.apollo.dev/nix/latest | sh`, {
      cwd: targetDirectory,
      stdio: 'inherit',
    })

    console.log(
      JSON.stringify({
        runner,
        message: `Apollo Rover was installed successfully`,
        timestamp: new Date().toISOString(),
      })
    )
  } catch (error) {
    console.error(
      JSON.stringify({
        runner,
        message: 'Error attempting to install Apollo Rover',
        error: 'stack' in error ? error.stack : error,
        timestamp: new Date().toISOString(),
      })
    )
  }
}

installApolloRover()
