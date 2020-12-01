import emojiRegex from 'emoji-regex';
import gemoji from 'gemoji';
import findAndReplace from 'mdast-util-find-and-replace';
import { skintoneMap, stripSkintone } from './skintone';

function emojiToName(emoji) {
  return gemoji.find((item) => item.emoji === emoji);
}

function getEmojiDescription(emoji) {
  const { skintone, genericEmoji } = stripSkintone(emoji);

  let info = emojiToName(genericEmoji);

  if (!info) {
    const appleEmoji = genericEmoji + '\uFE0F';
    info = emojiToName(appleEmoji);

    if (!info) {
      return '';
    }
  }

  const skintoneDescription = skintoneMap[skintone] || '';
  return skintoneDescription
    ? `${info.description} (${skintoneDescription})`
    : info.description;
}

function a11yEmoji() {
  function replace(match) {
    return {
      type: 'text',
      value: match,
      data: {
        hName: 'span',
        hProperties: { role: 'img', ariaLabel: getEmojiDescription(match) },
        hChildren: [{ type: 'text', value: match }],
      },
    };
  }

  function transform(markdownAST) {
    findAndReplace(markdownAST, emojiRegex(), replace);
  }

  return transform;
}

export default a11yEmoji;
