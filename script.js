'use strict';

let title = prompt('Как называется ваш проект?','Название проекта'),
    screens = prompt("Какие типы экранов нужно разработать? (Перечислите через запятую)", 'Простые, сложные'),
    screenPrice = +prompt("Сколько будет стоить данная работа?", '5000'),
    rollback,
    fullPrice,
    adaptive = confirm('Нужен ли адаптив на сайте'),
    service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1'),
    servicePrice1 = +prompt('Сколько это будет стоить?', '1000'),
    service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2'),
    servicePrice2 = +prompt('Сколько это будет стоить?', '1200'),
    servicePercentPrice;
    
if (screens != null)
    screens.toLowerCase().split(", ");  
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
rollback = Math.trunc(getRandomArbitrary(1,100));
fullPrice = Math.round(screenPrice + servicePrice1 + servicePrice2);
servicePercentPrice = fullPrice - fullPrice * (rollback/100);
switch(true) {
    case fullPrice >= 30000:
        alert ('Даем скидку 10%');
        break;
    case fullPrice >= 15000 && fullPrice < 30000:
        alert ('Даем скидку 5');
        break;
    case fullPrice < 15000 && fullPrice >= 0:
        alert ('Скидка не предусмотрена');
        break;
    case fullPrice < 0:
        alert ('Что то пошло не так');
        break;
}



console.log(title);
console.log(fullPrice);
console.log(adaptive);
if (screens != null)
    console.log(screens.length);
console.log('Стоимость верстки экранов (' + screenPrice + ') рублей/ долларов/гривен/юани');
console.log('Стоимость разработки сайта (' + fullPrice + ') рублей/ долларов/гривен/юани');
console.log('Какие типы экранов нужно разработать', screens);
console.log(fullPrice * (rollback/100));
console.log(servicePercentPrice);
