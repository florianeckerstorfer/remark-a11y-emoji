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
  skintone = skintone === null ? undefined : skintone[0]

  return { skintone, genericEmoji };
}

module.exports = {
  skintoneMap,
  stripSkintone,
}
