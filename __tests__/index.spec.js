import rehypeStringify from 'rehype-stringify';
import remark from 'remark';
import remarkRehype from 'remark-rehype';
import plugin from '../src';

jest.mock(
  'gemoji',
  () => [
    { emoji: '🎸', description: 'guitar' },
    { emoji: '✌️', description: 'victory hand' },
    { emoji: '👩‍💻', description: 'woman technologist' },
    { emoji: '🎧', description: 'headphone' },
  ],
  { virtual: true }
);

describe('remark-a11y-emoji', () => {
  const processor = remark()
    .use(plugin)
    .use(remarkRehype)
    .use(rehypeStringify);

  it('should return HTML for "🎸"', async () => {
    const input = '🎸';
    const expected = '<span role="img" aria-label="guitar">🎸</span>';

    const { contents } = await processor.process(input);
    expect(contents).toContain(expected);
  });

  it('should return HTML for emojis with skin tones', async () => {
    const input = '✌🏾';
    const expected =
      '<span role="img" aria-label="victory hand (skin tone 5)">✌🏾</span>';

    const { contents } = await processor.process(input);
    expect(contents).toContain(expected);
  });

  it('should return HTML for emojis without variant selector', async () => {
    const input = '👩🏾‍💻';
    const expected =
      '<span role="img" aria-label="woman technologist (skin tone 5)">👩🏾‍💻</span>';

    const { contents } = await processor.process(input);
    expect(contents).toContain(expected);
  });

  it('should return HTML for "foo 🎸 bar 🎧 qoo"', async () => {
    const input = 'foo 🎸 bar 🎧 qoo';
    const expected =
      'foo <span role="img" aria-label="guitar">🎸</span> bar <span role="img" aria-label="headphone">🎧</span> qoo';

    const { contents } = await processor.process(input);
    expect(contents).toContain(expected);
  });

  it('should use empty string as label if emoji does not exist', async () => {
    const input = '🚨';
    const expected = '<span role="img" aria-label="">🚨</span>';

    const { contents } = await processor.process(input);
    expect(contents).toContain(expected);
  });

  it('should return do nothing to other nodes', async () => {
    const input = 'foo **bar**';
    const expected = 'foo <strong>bar</strong>';

    const { contents } = await processor.process(input);
    expect(contents).toContain(expected);
  });
});
