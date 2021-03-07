import gemoji from 'gemoji';
import { skintoneMap, stripSkintone } from './skintone';

function emojiToName(emoji) {
  return gemoji.find((item) => item.emoji === emoji);
}

export function getEmojiDescription(emoji) {
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
