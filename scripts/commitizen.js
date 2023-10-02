/**
 * @fileoverview Defines the commitizen configuration.
 * @module scripts/commitizen
 * @see https://commitizen-tools.github.io/commitizen/
 */

// prettier-ignore
const scopes = [
  { value: 'ci',          name: 'ci:           anything bundling specific (e.g. rollup, webpack, etc.)'},
  { value: 'ui',          name: 'ui:           anything UI specific'},
  { value: 'iac',         name: 'iac:          anything IaC specific'},
  { value: 'core',        name: 'core:         anything Nexa specific'},
  { value: 'testing',     name: 'testing:      anything testing specific (e.g., Jest or Cypress)'},
  { value: 'linter',      name: 'linter:       anything Linter specific'},
  { value: 'plugin',      name: 'plugin:       anything Plugin specific'},
  { value: 'repo',        name: 'repo:         anything related to managing the repository itself'},
  { value: 'stories',     name: 'stories:      anything Storybook specific'},
  { value: 'misc',        name: 'misc:         anything unlisted and misc stuff'},
]

/**
 * Pre-populates the scope field with the name of the modified library.
 * @internal This is used by the commitizen CLI.
 */
const scopeComplete = require('child_process')
  .execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  // the bitwise NOT operator in the expression ~r.indexOf() converts the result of indexOf() to a boolean value
  .find((r) => ~r.indexOf('M  libs'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/libs%%((\w|-)*)/)?.[1]

/** 
 * @type {import('cz-git').CommitizenGitOptions} 
 */
module.exports = {
  /** @usage `pnpm commit :f` */
  alias: {
    f: 'docs(ui): fix typos',
    b: 'chore(repo): bump dependencies',
  },
  scopes,
  defaultScope: scopeComplete,
  scopesSearchValue: true,
  maxSubjectLength: 100,
  allowCustomScopes: false,
  allowEmptyScopes: false,
  allowCustomIssuePrefix: false,
  allowEmptyIssuePrefix: false,
  types: [
    {
      value: 'chore',
      name: "chore: Other changes that don't modify src or test files",
    },
    {
      value: 'feat',
      name: 'feat: A new feature',
    },
    {
      value: 'fix',
      name: 'fix: A bug fix',
    },
    {
      value: 'docs',
      name: 'docs: Documentation only changes',
    },
    {
      value: 'cleanup',
      name: 'cleanup: A code change that neither fixes a bug nor adds a feature',
    },
  ],
}
