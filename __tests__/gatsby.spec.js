import plugin from '../src/gatsby';
import Remark from 'remark';
import { visit } from 'unist-util-visit';

describe('remark-a11y-emoji/gatsby', () => {
  let remark;

  beforeEach(() => {
    remark = new Remark().data('settings', {
      commonmark: true,
      footnotes: true,
      pedantic: true,
    });
  });

  it('should return HTML for "🎸"', () => {
    const markdownAST = remark.parse('🎸');
    const result = plugin({ markdownAST });

    visit(result, 'html', (node) => {
      expect(node.value).toBe('<span role="img" aria-label="guitar">🎸</span>');
    });
  });

  it('should return HTML for "foo 🎸 bar 🎧 qoo"', () => {
    const markdownAST = remark.parse('foo 🎸 bar 🎧 qoo');
    const result = plugin({ markdownAST });

    visit(result, 'html', (node) => {
      expect(node.value).toBe(
        'foo <span role="img" aria-label="guitar">🎸</span> bar <span role="img" aria-label="headphone">🎧</span> qoo'
      );
    });
  });

  it('should return do nothing to other nodes', async () => {
    const markdownAST = remark.parse('foo **bar**');

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST),
    });

    expect(transformed).toEqual(markdownAST);
  });
});
