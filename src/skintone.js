const skintoneMap = {
  '🏻': 'skin tone 2',
  '🏼': 'skin tone 3',
  '🏽': 'skin tone 4',
  '🏾': 'skin tone 5',
  '🏿': 'skin tone 6',
}

function stripSkintone(emoji) {
  const skintoneRegex = new RegExp(Object.keys(skintoneMap).join('|'), 'g');
  const genericEmoji = emoji.replace(skintoneRegex, '');

  let skintone = emoji.match(skintoneRegex);
  skintone = skintone && skintone[0] ? skintone[0] : undefined;

  return { skintone, genericEmoji };
}

export {
  skintoneMap,
  stripSkintone,
}
