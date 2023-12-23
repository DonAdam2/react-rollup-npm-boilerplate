# Table of Contents:
- [Overview](#overview)
- [Installing & getting started](#installing--getting-started)
- [Publishing your package](#publishing-your-package)
- [Configuring prettier](#configuring-prettier)
- [Available scripts](#available-scripts)

## Overview:

This boilerplate allows you to create npm package fast and easy with the following setup:

- Storybook to build your component and see it in action before publishing it to npm.
- Rollup to bundle your package.
- Commitizen to simplify professional commit messages.
- standard-version which will bump package version, create a new release tag with the new version and updates CHANGELOG file. 

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

## Publishing your package:

### Create NPM token:

- Log into your [npm](https://www.npmjs.com/login) account.
- Click on **Edit Profile** button.
- Click on **Access Tokens**.
- Click on **Generate New Token**:
  - Click on **Classic Token**:
    - Enter token name.
    - Select **Automation** if you will use GitHub actions, select **Publish** if you will publish you package manually.
    - Click on **Generate Token**.
    - Copy the generated token and save it somewhere.

### Publishing a package with GitHub actions:

- Open your repository on GitHub => settings => Secrets and variables => Actions => New repository secret:
  - Name: **NPM_AUTH_TOKEN**
  - Secret: paste your npm access token.
- Create a new release:
  ```shell
  pnpm semantic-release
  ```
- push your changes to GitHub to run publish workflow.

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
- Create a new directory called **packageToShip**:
  ```shell
  mkdir packageToShip
  ```
- Navigate to **packageToShip** directory:
  ```shell
  cd packageToShip
  ```
- Copy **dist** directory into **packageToShip** directory:
  ```shell
  cp -r ../dist ./
  ```
- Copy **package.json**, **CHANGELOG.md**, **LICENSE**, **README.md** into **packageToShip** directory:
  ```shell
  cp ../{package.json,CHANGELOG.md,LICENSE,README.md} ./
  ```
- Publish your npm package:
  ```shell
  npm publish --access public
  ```

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

### `pnpm build-storybook`

- Builds your story book for production.

### `pnpm build-lib`

- Builds your package in the `dist` folder in 2 formats:
  - CommonJS (CJS).
  - ECMAScript (ESM).
- Output your package types into `dist/index.d.ts`

### `pnpm test`

- Runs all test files.

### `pnpm test:watch`

- Runs all unit test files in `/src` directory using watch mode.
- Runs all your tests once, then again on every change of your source code.

### `pnpm test:clear`

- Clears test cache.
