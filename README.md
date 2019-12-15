# remark-a11y-emoji

[![Badge for Tests](https://github.com/florianeckerstorfer/remark-a11y-emoji/workflows/Test/badge.svg)](https://github.com/florianeckerstorfer/remark-a11y-emoji/actions?query=workflow%3A%22Test)


Plugin for [Remark](https://remark.js.org) to make emoji accessible. This plugin wraps emoji in a `<span>` and sets the name of the emoji as `aria-label`.

Made by 👨‍💻[Florian Eckerstorfer](https://florian.ec) in beautiful 🎡 Vienna, Europe.


## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Contributing](#contributing)
4. [License](#license)

## Installation

You need to install `@fec/remark-a11y-emoji` with NPM or Yarn. Since this is a plugin for Remark, I assume you Remark already installed and configured.

```bash
npm install -D @fec/remark-a11y-emoji
yarn add --dev @fec/remark-a11y-emoji
```

## Configuration

You can use `@fec/remark-a11y-emoji` like any other Remark plugin:

```js
const remark = require('remark');
const a11yEmoji = require('@fec/remark-a11y-emoji');

const processor = remark().use(a11yEmoji);
```

# Contributing

To contribute to `@fec/remark-a11y-emoji`, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Install dependencies: `npm install`
4. Make your changes (and don't forget to update the tests)
5. Don't forgot to run the tests: `npm test`
6. Commit your changes: `git commit -m '<commit_message>'`
7. Push to the original branch: `git push origin <project_name>/<location>`
8. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

This project is licenses under the [MIT License](LICENSE).
