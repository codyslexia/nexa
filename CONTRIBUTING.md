# Contributing to Nexa

We would love for you to contribute to Nexa! Read this document to see how to do it.

## Got a Question?

We are trying to keep GitHub issues for bug reports and feature requests. Using the `codyslexia` tag on [Stack Overflow](https://stackoverflow.com/questions/tagged/codyslexia) is a much better place to ask general questions about how to use Nexa.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](https://github.com/codyslexia/nexa/blob/main/CONTRIBUTING.md#submit-issue) to [our GitHub Repository](https://github.com/codyslexia/nexa). Even better, you can [submit a Pull Request](https://github.com/codyslexia/nexa/blob/main/CONTRIBUTING.md#submit-pr) with a fix.

## Project Structure

Source code and documentation are included in the top-level folders listed below.

- `docs` - Tutorials, guides and API docs live here.
- `e2e` - E2E tests for apps and libs.
- `libs` - Source code for the Nexa libraries.
- `scripts` - Scripts for project tasks such as building, testing, and formatting.
- `plugins` - Workspace generators, executors or builders.
- `tmp` - Folder used by e2e tests. If you are a WebStorm user, make sure to mark this folder as excluded.

## Development Workstation Setup

If you are using `VSCode`, and provided you have [Docker](https://docker.com) installed on your machine, then you can leverage [Dev Containers](https://containers.dev) through this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), to easily setup your development environment, with everything needed to contribute to Nexa, already installed (namely `NodeJS`, `Yarn`, `Rust`, `Cargo`, plus some tools like `nx` and `pnpm`).

To do so, simply:

- Checkout the repo
- Open it with VSCode
- Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and select "Dev Containers: Open Folder in Container..."

The repo comes with a preconfigured `devcontainer.json` file (located in `.devcontainer/` folder at root), that `VSCode` will automatically use to install the aforementioned tools, inside a Docker image. It will even run `pnpm install` for you, so you can start contributing to Nexa right after.

If you open the repo in [Github Codespace](https://github.com/features/codespaces), it will also leverage this config file, to setup the codespace, with the same required tools.

## Building the Project

> If you have VSCode + Docker, this can be automated for you, see [section](#development-workstation-setup) above

After cloning the project to your machine, to install the dependencies, run:

```bash
pnpm i
```

To build all the packages, run:

```bash
pnpm nx build
```

### Running Unit Tests

To make sure your changes do not break any unit tests, run the following:

```bash
pnpm nx affected --target=test
```

### Running E2E Tests

**Use Node 18 and NPM 8. E2E tests won't work on Node 15 and NPM 7.**

To make sure your changes do not break any E2E tests, run:

```bash
pnpm nx e2e e2e-accounts # or any other project here
```

Sometimes tests pass locally but they fail on the CI. To reproduce the CI environment and be able to debug the issue, run:

```bash
NX_VERBOSE_LOGGING=true CI=true SELECTED_PM=pnpm pnpm nexa e2e e2e-accounts --t="should do something in this test"
```

The above command sets verbose logging (this exposes stack traces and underlying errors), sets the defaults to be CI-like and sets `pnpm` as the selected package manager.

### Developing on Windows

To build Nexa on Windows, you need to use WSL.

- Run `pnpm install` in WSL. If you don't run `install`, they will be compiled for Windows.
- Run `nexa affected --target=test` and other commands in WSL.

## Documentation

We would love for you to contribute to our documentation as well. Please feel welcome to submit fixes or enhancements to our existing documentation pages.

### Documentation Structure

#### Documentation Pages

Our documentation pages can be found within this repo under the `docs` directory. We also run automated scripts based on `docs/map.json` data to safeguard against common human errors that could break our site.

#### Nexa Application

Our public `codyslexia.com/nexa/docs` documentation site is a [Next.js](https://nextjs.org/) application. The documentation site is consuming the `docs/` directly by copy-ing its content while deploying, so the website is always in sync and reflects the latest version of `docs/`.

Jump to [Running the Documentation Site Locally](#running-the-documentation-site-locally) to see how to preview your changes while serving.

### Running the Documentation Site Locally

To run `docs` locally, run the command:

```bash
npx nx serve docs
```

You can then access the application locally at `localhost:4200`.

#### Troubleshooting: `JavaScript heap out of memory`

If you see an error that states: `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`, you need to [increase the max memory size of V8's old memory section](https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes):

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
```

After configuring this, try to run `npx nx serve docs` again.

### PR Preview

When submitting a PR, this repo will automatically generate a preview of the `docs` application based on the contents of your pull request.

Once the preview site is launched, a comment will automatically be added to your PR with the link your PR's preview. To check your docs changes, make sure to select `Preview` from the version selection box of the site.

## Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker. An issue for your problem may already exist and has been resolved, or the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. Having a reproducible scenario gives us wealth of important information without going back and forth with you requiring additional information, such as:

- `yarn.lock` or `package-lock.json` or `pnpm-lock.yaml`
- and most importantly - a use-case that fails

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproduction in order to save maintainers' time and ultimately be able to fix more bugs. Interestingly, from our experience, users often find coding problems themselves while preparing a minimal reproduction repository. We understand that sometimes it might be hard to extract essentials bits of code from a larger codebase, but we really need to isolate the problem before we can fix it.

You can file new issues by filling out our [issue form](https://github.com/codyslexia/nexa/issues/new/choose).

#### Commit Message Guidelines

The commit message should follow the following format:

```plain
type(scope): subject
BLANK LINE
body
```

##### Type

The type must be one of the following:

- **feat**
  New or improved behavior being introduced (e.g. Updating to new versions of React or Jest which bring in new features)
- **fix**
  Fixes the current unexpected behavior to match expected behavior (e.g. Fixing the library generator to create the proper named project)
- **cleanup**
  Code style changes that have little to no effect on the user (e.g. Refactoring some functions into a different file)
- **docs**
  Changes to the documentation (e.g. Adding more details into the getting started guide)
- **chore**
  Changes that have absolutely no effect on users (e.g. Updating the version of `nx` used to build the repo)

##### Scope

The scope must be one of the following:

- **ci** - anything bundling specific (e.g. rollup, webpack, etc.)
- **ui** - anything UI specific
- **iac** - anything IaC specific
- **core** - anything Nexa specific
- **testing** - anything testing specific (e.g., Jest or Cypress)
- **linter** - anything Linter specific
- **plugin** - anything Plugin specific
- **repo** - anything related to managing the repository itself
- **stories** - anything Storybook specific
- **misc** - anything unlisted and misc stuff

##### Subject and Body

The subject must contain a description of the change, and the body of the message contains any additional details to provide more context about the change.

Including the issue number that the PR relates to also helps with tracking.

#### Example

```plain
feat(ui): add an option to generate lazy-loadable modules

`npx nx generate lib mylib --lazy` provisions the mylib project in .eslintrc.json

closes #157
```

#### Commitizen

To simplify and automate the process of committing with this format, **Nexa is a [Commitizen](https://github.com/commitizen/cz-cli) friendly repository**, just do `git add` and execute `pnpm commit`.
