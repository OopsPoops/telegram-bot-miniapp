const test=require('node:test');
const assert=require('node:assert/strict');
const {getEntryPlaceholders}=require('../entry-placeholders.js');

function at(hour,minute=0){
  return new Date(2026,0,1,hour,minute);
}

test('uses the overnight phrases before 06:00',()=>{
  assert.deepEqual(getEntryPlaceholders(at(0),()=>0),{
    sugar:'Ты чего не спишь?',
    insulin:'Ночная смена'
  });
  assert.deepEqual(getEntryPlaceholders(at(5,59),()=>0),{
    sugar:'Ты чего не спишь?',
    insulin:'Ночная смена'
  });
});

test('switches phrase groups at each time boundary',()=>{
  assert.equal(getEntryPlaceholders(at(6),()=>0).insulin,'Завтрак близко!');
  assert.equal(getEntryPlaceholders(at(11),()=>0).insulin,'Фиксируем данные');
  assert.equal(getEntryPlaceholders(at(15),()=>0).insulin,'Ужинный учёт');
  assert.equal(getEntryPlaceholders(at(19),()=>0).insulin,'Финальный отчёт');
});

test('uses universal sugar phrases when no time-specific sugar phrase is listed',()=>{
  assert.equal(getEntryPlaceholders(at(12),()=>0).sugar,'Сахарок, привет!');
});

test('can choose a universal sugar phrase in every time slot',()=>{
  for(const hour of [0,6,11,15,19]){
    assert.equal(getEntryPlaceholders(at(hour),()=>.99).sugar,'Сколько?');
  }
});
