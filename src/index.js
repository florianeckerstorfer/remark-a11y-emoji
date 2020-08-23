const emojiRegex = require('emoji-regex');
const gemoji = require('gemoji');
const visit = require('unist-util-visit');

const { stripSkintone, skintoneMap } = require('./skintone');

function a11yEmoji() {
  function getEmojiDescription(emoji) {
    const { skintone, genericEmoji } = stripSkintone(emoji);

    const info = gemoji.unicode[genericEmoji];

    if (!info) {
      return '';
    }

    const skintoneDescription = skintoneMap[skintone] || '';
    return skintoneDescription
      ? `${info.description} (${skintoneDescription})`
      : info.description;
  }

  function visitor(node) {
    node.value = node.value.replace(emojiRegex(), match => {
      node.type = 'html';
      const description = getEmojiDescription(match);
      return `<span role="img" aria-label="${description}">${match}</span>`;
    });
  }

  function transform(markdownAST) {
    visit(markdownAST, 'text', visitor);
  }

  return transform;
}

module.exports = a11yEmoji;
