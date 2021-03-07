# remark-a11y-emoji

[![Unit tests](https://github.com/florianeckerstorfer/remark-a11y-emoji/actions/workflows/test.yml/badge.svg)](https://github.com/florianeckerstorfer/remark-a11y-emoji/actions/workflows/test.yml)
[![Integration tests](https://github.com/florianeckerstorfer/remark-a11y-emoji/actions/workflows/integration.yml/badge.svg)](https://github.com/florianeckerstorfer/remark-a11y-emoji/actions/workflows/integration.yml)

Plugin for [Remark](https://remark.js.org) to make emoji accessible. This plugin wraps emoji in a `<span>` and sets the name of the emoji as `aria-label`. `remark-a11y-emoji` also works with [Gatsby](https://www.gatsbyjs.com).

Made by 👨‍💻[Florian Eckerstorfer](https://florian.ec) in beautiful 🎡 Vienna, Europe.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Configuration with Gatsby](#configuration-with-gatsby)
4. [Code of Conduct](#code-of-conduct)
5. [Contributing](#contributing)
6. [License](#license)
7. [Change-log](#change-log)

## Installation

You need to install `@fec/remark-a11y-emoji` with NPM or Yarn. Since this is a plugin for Remark, I assume you already have Remark installed and configured.

```bash
npm install -D @fec/remark-a11y-emoji
yarn add --dev @fec/remark-a11y-emoji
```

## Configuration

You can use `@fec/remark-a11y-emoji` like any other Remark plugin. The plugin produces an AST ([hast](https://github.com/syntax-tree/hast), [rehype](https://github.com/rehypejs/rehype)), which you can serialize to HTML with [rehype-stringify](https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify):

```js
import remark from 'remark';
import a11yEmoji from '@fec/remark-a11y-emoji';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

const processor = remark()
  .use(a11yEmoji)
  .use(remarkRehype)
  .use(rehypeStringify);
```

## Configuration with Gatsby

```javascript
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // ...
          '@fec/remark-a11y-emoji/gatsby',
        ],
      },
    },
  ],
};
```

## Code of Conduct

See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)

## Contributing

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

See [LICENSE](LICENSE.md)

## Change log

See [CHANGELOG](CHANGELOG.md)
