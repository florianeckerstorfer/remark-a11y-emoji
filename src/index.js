import emojiRegex from 'emoji-regex';
import findAndReplace from 'mdast-util-find-and-replace';
import { getEmojiDescription } from './helper';

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
    return markdownAST;
  }

  return transform;
}

export default a11yEmoji;
