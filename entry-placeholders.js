const universalSugarPhrases=[
  'Сахарок, привет!',
  'Хоть бы 5,5',
  'Ставлю на 4,8',
  'Ставлю на 4,9',
  'Ставлю на 5,0',
  'Ставлю на 5,1',
  'Ставлю на 5,2',
  'Ставлю на 5,3',
  'Ставлю на 5,4',
  'Ставлю на 5,5',
  'Ставлю на 5,6',
  'Ставлю на 5,7',
  'Ставлю на 5,8',
  'Ставлю на 5,9',
  'Ну-ка, сахар!',
  'Как сахарок?',
  'Сколько?'
];

const timeSlots=[
  {start:0,end:360,sugar:['Ты чего не спишь?','Сахарный дозор'],insulin:['Ночная смена','Бессонный Сёма']},
  {start:360,end:660,sugar:['Доброе утро!'],insulin:['Завтрак близко!','Утренний разгон','Начинаем день']},
  {start:660,end:900,sugar:[],insulin:['Фиксируем данные','Давай 2','Две или три?']},
  {start:900,end:1140,sugar:['Приятного','На контроле!'],insulin:['Ужинный учёт','Время записей']},
  {start:1140,end:1440,sugar:['Ну как день?','Сладких цифр!'],insulin:['Финальный отчёт','Закрываем смену']}
];

function pickRandom(items,random){
  return items[Math.min(Math.floor(random()*items.length),items.length-1)];
}

function getEntryPlaceholders(date=new Date(),random=Math.random){
  const minutes=date.getHours()*60+date.getMinutes();
  const slot=timeSlots.find(({start,end})=>minutes>=start&&minutes<end);
  const sugarPhrases=slot.sugar.length&&random()<.5?slot.sugar:universalSugarPhrases;
  return {
    sugar:pickRandom(sugarPhrases,random),
    insulin:pickRandom(slot.insulin,random)
  };
}

if(typeof module!=='undefined')module.exports={getEntryPlaceholders};
