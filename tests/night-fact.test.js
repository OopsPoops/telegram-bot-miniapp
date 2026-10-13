const test=require('node:test');
const assert=require('node:assert/strict');
const {formatNightFact}=require('../night-fact.js');

test('marks a manually entered fact',()=>{
  assert.deepEqual(formatNightFact('Ночной = 10 ✍️.'),{text:'✍️ 10',unit:'ед.'});
});

test('marks a calculated value as approximate',()=>{
  assert.deepEqual(formatNightFact('Ночной = 5 ≈.'),{text:'≈5',unit:'ед.'});
});

test('leaves an unmarked value without a marker',()=>{
  assert.deepEqual(formatNightFact('Ночной = 5.'),{text:'5',unit:'ед.'});
});

test('preserves a missing night value without a marker',()=>{
  assert.deepEqual(formatNightFact('Ночной = —.'),{text:'—',unit:'ед.'});
});

test('keeps compatibility with older report markers',()=>{
  assert.deepEqual(formatNightFact('Ночной = 10 (ручной ввод).'),{text:'✍️ 10',unit:'ед.'});
  assert.deepEqual(formatNightFact('Ночной = 5 ⚠️.'),{text:'≈5',unit:'ед.'});
});
