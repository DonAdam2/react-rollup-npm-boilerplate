# Table of Contents:
- [Overview](#overview)
- [Installing & getting started](#installing--getting-started)
- [Publishing your package](#publishing-your-package)
- [Setup local NPM registry](#setup-local-npm-registry)
- [Configuring prettier](#configuring-prettier)
- [Available scripts](#available-scripts)

## Overview:

This boilerplate allows you to create npm package fast and easy with the following setup:

- Storybook to build your component and see it in action before publishing it to npm.
- Rollup to bundle your package.
- Commitizen to simplify professional commit messages.
- standard-version which will bump package version, create a new release tag with the new version and updates CHANGELOG file. 

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Installing / Getting Started:

- Install packages `pnpm install`
- Package JSON:
  - name: add the name of your package.
  - description: add the description of your package.
  - repository => url: add the URL of your package.
  - keywords: add keywords to represent your package (SEO).
  - author: add your name.
  - bugs => url: add issues link of your repository.
  - homepage: add readme link of your repository.
- src/components:
  - Add your component with named export in a directory with the same name of your component and don't forget to add index.ts file in the same directory.
  - Update `src/components/index.ts` to export your component.
  - Add component stories in a file with this extension `ComponentName.stories.tsx` following the instructions on [storybook](https://storybook.js.org/) site.
  - Add component test in a file with this extension `ComponentName.test.tsx`.
- run `pnpm storybook` to see your component during development.
- run `pnpm commit` to commit your files following **conventional commit** standards.

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Publishing your package:

The GitHub actions workflow (`.github/workflows/publish.yml`) publishes with npm [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) and [staged publishing](https://docs.npmjs.com/staged-publishing):

- No npm token is stored in GitHub. npm verifies the workflow identity directly with GitHub, so there is nothing to expire or leak, and every version gets a provenance statement automatically.
- The workflow runs `npm stage publish`, so a new version only goes live after you approve it with 2FA on npmjs.com.

NOTE:
- npm is [restricting granular access tokens that bypass 2FA](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/) (account changes from August 2026, direct publishing from January 2027), so the old `NPM_AUTH_TOKEN` secret approach will stop working.

### Set up trusted publishing:

- A trusted publisher can only be added to a package that already exists on npm, so publish the first version manually (see [Publishing a package manually](#publishing-a-package-manually)).
- Log into your [npm](https://www.npmjs.com/login) account and open your package => **Settings** => **Trusted Publisher**:
  - Publisher: **GitHub Actions**.
  - Label (optional): e.g. **GitHub Actions – publish.yml (staged)**.
  - Organization or user: your GitHub username or organization (***case-sensitive***).
  - Repository: your repository name (***case-sensitive***).
  - Workflow filename: **publish.yml** (filename only).
  - Environment name: leave it **empty** (only fill it if your publish job uses a GitHub environment with the exact same name, otherwise publishing fails).
  - Allowed actions: leave **Allow npm publish** and **Allow npm dist-tag** unchecked, `npm stage publish` is always allowed.
  - Click on **Set up connection** button.

  NOTE:
  - The provider and required fields can't be changed later, to change them delete the connection and create a new one.
- Make sure `repository => url` in **package.json** points to your GitHub repository, npm uses it to verify the provenance statement.

### Publishing a package with GitHub actions:

- Create new branch out of `main`.
- Commit your changes:
  ```shell
  pnpm commit
  ```
- Create a new release:
  ```shell
  pnpm semantic-release
  ```
  NOTE:
  - If you want to commit and run semantic release at the same time use the following script:
    ```shell
    pnpm release
    ```
- push your changes to GitHub.
- Open a PR from your branch into `main` and merge it.
- Create a new release on `github`:
  - Click on `Choose a tag` and add a new release candidate tag (***e.g. v1.0.0***)
  - Click on `Generate release notes`
  - Insert release title (***same as tag***)
  - Click on `Publish release`
  - Open `Actions` tab to see the progress of your workflow, the publish job stages the new version (***e.g. `+ your-package@1.0.0 (staged with id <stage-id>)`***).
- Approve the staged version:
  - Open your package on npmjs.com => **Versions** tab, the new version shows as **Staged**.
  - Click on **Review it in Staged Packages**, check the version and stage id, then click on **Approve** and enter your 2FA code.
  - Or approve it from the terminal (requires npm 11.15.0 or later):
    ```shell
    npx "npm@^11.15.0" login
    npx "npm@^11.15.0" stage approve <stage-id>
    ```
  - The version changes from **Staged** to **Published** and becomes the `latest` tag (the npmjs.com package page may take a few minutes to update, `npm view <your-package> version` shows it right away).
- After the first successful staged release, harden your package:
  - Open your package => **Settings** => **Publishing access** => select **Require two-factor authentication and disallow bypass 2fa tokens** => click on **Update Package Settings**.
  - If you used an `NPM_AUTH_TOKEN` secret before, delete it from your repository on GitHub => settings => Secrets and variables => Actions, and revoke the token on npmjs.com => **Access Tokens**.

### Publishing a package manually:

- Run your tests:
  ```shell
  pnpm test
  ```
- Run semantic release script to create a new release, bump package version and update **CHANGELOG.md** file:
  ```shell
  pnpm semantic-release
  ```
- Build your package:
  ```shell
  pnpm build-lib
  ```
- Navigate to **lib** directory:
  ```shell
  cd lib
  ```
- Log into your npm account (if you aren't logged in already):
  ```shell
  npm login
  ```
- Publish your npm package (you'll be prompted for your 2FA code):
  ```shell
  npm publish --access public
  ```

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Setup local NPM registry

- I like to publish my package to a local registry and test it locally before publishing it to NPM.
- We will use **verdaccio** registry:
  - Pull verdaccio image:
  ```shell
  docker pull verdaccio/verdaccio
  ```
  - Run verdaccio container:
  ```shell
  docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
  ```
  - Create a new user:
  ```shell
  npm adduser --registry http://localhost:4873/
  ```
  - Publish your package after building it:
  ```shell
  npm publish --registry http://localhost:4873/
  ```
  - Install your package from your local registry:
  ```shell
  npm install <package_name> --registry http://localhost:4873/
  ```

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Configuring Prettier:

This build relies on [Prettier formatter](https://prettier.io/) to enforce code style. And [ESLint](https://eslint.org/) for identifying problematic patterns found in the code.

- Setting up prettier:

  1- You can find steps on how to set up prettier formatter with WebStorm/PhpStorm [here](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher).

  **Notes**:

    - It's better to use local `node_modules` version of prettier instead of a global one, to avoid version conflicts (in case the globally installed version does not match the version specified in `package.json`).

  2- Follow the next steps to set up **prettier** and **eslint** in **_VS Code_**:

    - Install `prettier` plugin

    - Install `eslint` plugin

    - Open **_VS Code settings_** `CTRL + ,`:

      a- Search for `formatter` => check **Format on save**

      b- Search for `prettier` => add `.prettierrc` in **_Prettier: Config Path_** section && check **_Prettier: Require Config_**

  3- Please refer to other tutorials if you are using a different IDE.

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Available Scripts

In the project directory, you can run:

### `pnpm storybook`

- Runs storybook in development mode.
- Opens automatically on [http://localhost:6006](http://localhost:6006)

### `pnpm commit`

- Creates a professional commit following conventional commit standards.

### `pnpm semantic-release`:

- Creates or updates CHANGELOG file.
- Creates a new release tag.
- Bump package version in `package.json`.

### `pnpm release`

- Runs 2 scripts `pnpm commit` and `pnpm semantic-release`.

### `pnpm build-storybook`

- Builds your story book for production.

### `pnpm build-lib`

- Builds your package in the `dist` folder in 2 formats:
  - CommonJS (CJS).
  - ECMAScript (ESM).
- Output your package types into `dist/index.d.ts`
- Creates a new directory called **lib** and copies the following into it to make your package ready for publishing:
  - dist folder
  - package.json
  - LICENSE
  - README.md

### `pnpm test`

- Runs all test files.

### `pnpm test:watch`

- Runs all unit test files in `/src` directory using watch mode.
- Runs all your tests once, then again on every change of your source code.

### `pnpm test:clear`

- Clears test cache.

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>
