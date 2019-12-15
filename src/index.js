const emojiRegex = require('emoji-regex');
const gemoji = require('gemoji');
const visit = require('unist-util-visit');

function a11yEmoji() {
  function visitor(node) {
    node.value = node.value.replace(emojiRegex(), match => {
      node.type = 'html';
      const description = gemoji.unicode[match]
        ? gemoji.unicode[match].description
        : '';
      return `<span role="img" aria-label="${description}">${match}</span>`;
    });
  }

  function transform(markdownAST) {
    visit(markdownAST, 'text', visitor);
  }

  return transform;
}

module.exports = a11yEmoji;
