#!/usr/bin/env node

/**
 * @fileoverview Validates git commit messages.
 * @module scripts/commit-lint
 * @see
 */
const { types, scopes } = require('./commitizen.js')

console.log('🐋 Validating %cgit commit%c message', 'color: white', 'color:default')

const gitMessage = require('child_process').execSync('git log -1 --no-merges').toString().trim()
const allowedTypes = types.map((type) => type.value).join('|')
const allowedScopes = scopes.map((scope) => scope.value).join('|')
const commitMsgRegex = `(${allowedTypes})\\((${allowedScopes})\\)!?:\\s(([a-z0-9:\-\s])+)`
const matchCommit = new RegExp(commitMsgRegex, 'g').test(gitMessage)
const matchRevert = /Revert/gi.test(gitMessage)
const matchRelease = /Release/gi.test(gitMessage)
const exitCode = +!(matchRelease || matchRevert || matchCommit)

if (exitCode === 0) {
  console.log('%c✔%c Commit Accepted\n', 'color: green', 'color: default')
}

if (exitCode !== 0) {
  console.log(
    '[Error]: Oh no! 😦 Your commit message: \n' +
      '-------------------------------------------------------------------\n' +
      gitMessage +
      '\n-------------------------------------------------------------------' +
      '\n\n 👉️ Does not follow the commit message convention specified in the CONTRIBUTING.md file.'
  )
  console.log('\ntype(scope): subject \n BLANK LINE \n body')
  console.log('\n')
  console.log(`possible types: ${allowedTypes}`)
  console.log(`possible scopes: ${allowedScopes} (if unsure use "core")`)
  console.log(
    '\nExample: \n' +
      'feat(ui): add an option to generate lazy-loadable modules\n' +
      'fix(core)!: breaking change should have exclamation mark\n'
  )
}

process.exit(exitCode)
