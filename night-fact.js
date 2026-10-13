function formatNightFact(todayResult){
  const line=String(todayResult).match(/Ночной\s*=\s*([^\n]+)/i);
  if(!line)throw new Error('В отчёте за сегодня нет ночного значения.');
  const valueMatch=line[1].match(/^\s*(-?\d+(?:[.,]\d+)?|[-—])/);
  if(!valueMatch)throw new Error('Не удалось прочитать ночное значение.');
  const value=valueMatch[1]==='-'?'—':valueMatch[1];
  if(value==='—')return {text:value,unit:'ед.'};
  const marker=line[1].slice(valueMatch[0].length);
  if(/✍️|ручной ввод/i.test(marker))return {text:`✍️ ${value}`,unit:'ед.'};
  return {text:/≈|⚠️/.test(marker)?`≈${value}`:value,unit:'ед.'};
}

if(typeof module!=='undefined')module.exports={formatNightFact};
