let title = 'Название проекта',
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 5000,
    rollback,
    fullPrice = 10000,
    adaptive = true;
    
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
rollback = Math.trunc(getRandomArbitrary(1,100));
console.log(typeof(title));
console.log(typeof(fullPrice));
console.log(typeof(adaptive));
console.log(screens.length);
console.log('Стоимость верстки экранов (' + screenPrice + ') рублей/ долларов/гривен/юани');
console.log('Стоимость разработки сайта (' + fullPrice + ') рублей/ долларов/гривен/юани');
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback/100));
