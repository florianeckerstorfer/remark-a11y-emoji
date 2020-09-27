import emojiRegex from 'emoji-regex';
import gemoji from 'gemoji';
import visit from 'unist-util-visit';
import { stripSkintone, skintoneMap } from './skintone';

function emojiToName(emoji) {
  return gemoji.find(item => item.emoji === emoji);
}

function a11yEmoji() {
  function getEmojiDescription(emoji) {
    const { skintone, genericEmoji } = stripSkintone(emoji);

    let info = emojiToName(genericEmoji);

    if (!info) {
      const appleEmoji = genericEmoji + '\uFE0F';
      info = emojiToName(appleEmoji);

      if (!info) {
        return ''
      }
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

export default a11yEmoji;
