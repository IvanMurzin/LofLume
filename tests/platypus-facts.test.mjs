import test from 'node:test';
import assert from 'node:assert/strict';
import { platypusFacts } from '../src/platypusFacts.ts';
import { pickNextFactIndex } from '../src/facts.ts';
import { localeCodes } from '../src/i18n.ts';

test('fact catalog has unique ids, complete translations and source URLs', () => {
  assert.ok(platypusFacts.length >= 500);
  assert.equal(new Set(platypusFacts.map(f => f.id)).size, platypusFacts.length);
  for (const locale of localeCodes) assert.equal(new Set(platypusFacts.map(f => f.text[locale].toLowerCase())).size, platypusFacts.length);
  for (const fact of platypusFacts) {
    assert.equal(new URL(fact.source).protocol, 'https:');
    for (const locale of localeCodes) {
      assert.ok(fact.text[locale].trim());
      assert.ok(fact.text[locale].length <= 200, fact.id);
    }
  }
});
test('random choice reaches every eligible fact once across equal probability intervals', () => {
  const size = platypusFacts.length;
  for (const previous of [null, 0, Math.floor(size / 2), size - 1]) {
    const count = size - (previous === null ? 0 : 1);
    const choices = Array.from({length: count}, (_, i) => pickNextFactIndex(size, previous, () => (i + .5) / count));
    assert.equal(new Set(choices).size, count);
    assert.ok(choices.every(n => n >= 0 && n < size && n !== previous));
    assert.equal(pickNextFactIndex(size, previous, () => 0), previous === 0 ? 1 : 0);
    assert.equal(pickNextFactIndex(size, previous, () => 1 - Number.EPSILON), previous === size - 1 ? size - 2 : size - 1);
  }
});

test('selection handles a one-entry catalogue and rejects an empty one', () => {
  assert.equal(pickNextFactIndex(1, 0), 0);
  assert.throws(() => pickNextFactIndex(0, null), RangeError);
});
