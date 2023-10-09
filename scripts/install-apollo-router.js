#!/usr/bin/env node

/**
 * @fileoverview Installs Apollo Router binary.
 * @module scripts/install-apollo-router
 * @see {@link https://www.apollographql.com/docs/router/quickstart/}
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Derives runner's name from `__filename`.
 * @example
 * console.log(__filename) // '/urs/dev/nexa/app/scripts/my-script.js'
 * const runner = 'scripts/my-script.js'
 */
const runner = __filename.split(process.cwd()).pop().slice(1)

async function installApolloRouter() {
  const targetDirectory = path.resolve(__dirname, '../tmp')
  const binaryPath = path.join(targetDirectory, 'router')

  // check if binary already exists
  if (fs.existsSync(binaryPath)) {
    console.log(
      JSON.stringify({
        runner,
        message: `Apollo Router binary already exists at '${binaryPath}'. Skipping installation.`,
        timestamp: new Date().toISOString(),
      })
    )
    return
  }

  // ensure that targetDirectory exists or create it
  if (!fs.existsSync(targetDirectory)) {
    console.log(
      JSON.stringify({
        runner,
        message: `Creating target directory '${targetDirectory}'`,
        timestamp: new Date().toISOString(),
      })
    )
    fs.mkdirSync(targetDirectory, { recursive: true })
  }

  console.log(
    JSON.stringify({
      runner,
      message: `Installing Apollo Router at '${binaryPath}'`,
      timestamp: new Date().toISOString(),
    })
  )

  try {
    execSync(`curl -sSL https://router.apollo.dev/download/nix/latest | sh`, {
      cwd: targetDirectory,
      stdio: 'inherit',
    })

    console.log(
      JSON.stringify({
        runner,
        message: `Apollo Router was installed at '${binaryPath}'`,
        timestamp: new Date().toISOString(),
      })
    )
  } catch (error) {
    console.error(
      JSON.stringify({
        runner,
        message: 'Error attempting to install Apollo Router',
        error: 'stack' in error ? error.stack : error,
        timestamp: new Date().toISOString(),
      })
    )
  }
}

installApolloRouter()
