import emojiRegex from 'emoji-regex';
import { visit } from 'unist-util-visit';
import { getEmojiDescription } from './helper';

function a11yEmoji({ markdownAST }) {
  function visitor(node) {
    node.value = node.value.replace(emojiRegex(), (match) => {
      node.type = 'html';
      const description = getEmojiDescription(match);
      return `<span role="img" aria-label="${description}">${match}</span>`;
    });
  }

  visit(markdownAST, 'text', visitor);
  return markdownAST;
}

export default a11yEmoji;
