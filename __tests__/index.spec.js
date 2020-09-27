import plugin from '../src';
import remark from 'remark';
import html from 'remark-html';
import gemoji from 'gemoji';

jest.mock('gemoji', ()=>([
  { emoji: '🎸', description: 'guitar' },
  { emoji: '✌️', description: 'victory hand' },
  { emoji: '👩‍💻', description: 'woman technologist' },
  { emoji: '🎧', description: 'headphone' },
]), { virtual: true })

describe('remark-a11y-emoji', () => {

  const processor = remark()
    .use(html)
    .use(plugin);

  it('should return HTML for "🎸"', done => {
    const input = '🎸';
    const expected = '<span role="img" aria-label="guitar">🎸</span>';

    processor.process(input, (_, file) => {
      expect(String(file)).toContain(expected);
      done();
    });
  });

  it('should return HTML for emojis with skin tones', done => {
    const input = '✌🏾';
    const expected = '<span role="img" aria-label="victory hand (skin tone 5)">✌🏾</span>';

    processor.process(input, (_, file) => {
      expect(String(file)).toContain(expected);
      done();
    });
  });

  it('should return HTML for emojis without variant selector', done => {
    const input = '👩🏾‍💻';
    const expected = '<span role="img" aria-label="woman technologist (skin tone 5)">👩🏾‍💻</span>';

    processor.process(input, (_, file) => {
      expect(String(file)).toContain(expected);
      done();
    });
  });

  it('should return HTML for "foo 🎸 bar 🎧 qoo"', done => {
    const input = 'foo 🎸 bar 🎧 qoo';
    const expected =
      'foo <span role="img" aria-label="guitar">🎸</span> bar <span role="img" aria-label="headphone">🎧</span> qoo';

    processor.process(input, (_, file) => {
      expect(String(file)).toContain(expected);
      done();
    });
  });

  it('should use empty string as label if emoji does not exist', done => {
    const input = '🚨';
    const expected = '<span role="img" aria-label="">🚨</span>';

    processor.process(input, (_, file) => {
      expect(String(file)).toContain(expected);
      done();
    });
  });

 it('should return do nothing to other nodes', done => {
    const input = 'foo **bar**';
    const expected = 'foo <strong>bar</strong>';

    processor.process(input, (_, file) => {
      expect(String(file)).toContain(expected);
      done();
    });
  });
});
