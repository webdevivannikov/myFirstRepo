'use strict';

let rollback,
    fullPrice,
    servicePercentPrice,
    allServicePrices,
    title = prompt('Как называется ваш проект?','Название проекта'),
    screens = prompt("Какие типы экранов нужно разработать? (Перечислите через запятую)", 'Простые, сложные'),
    screenPrice = +prompt("Сколько будет стоить данная работа?", '5000'),
    adaptive = confirm('Нужен ли адаптив на сайте'),
    service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1'),
    servicePrice1 = +prompt('Сколько это будет стоить?', '1000'),
    service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2'),
    servicePrice2 = +prompt('Сколько это будет стоить?', '1200');

    
function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
function getFullPrice(priceScreen, pricesService){
        return priceScreen + pricesService;
    }

const getAllServicePrices = function(price1, price2){
    return price1 + price2;
};
const getTitle = function(str){
    if (str.trim() != '') {
        return (str[0].toUpperCase() + str.slice(1)).trim();
    }    
};
const getServicePercentPrices = function(total, percent){
    return total - total* (percent/100);
};
const getArray = function(str){
    if (str != null)
        return str.toLowerCase().split(", ");
};
const showTypeOf = function(variable){
    console.log(variable, typeof variable);
};
const getRollbackMessage = function(price) {
    switch(true) {
        case price >= 30000:
            return 'Даем скидку 10%';
        case price >= 15000 && price < 30000:
            return 'Даем скидку 5';
        case price < 15000 && price >= 0:
            return 'Скидка не предусмотрена';
        case price < 0:
            return 'Что то пошло не так';
    }
};


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = Math.round(getFullPrice(screenPrice, allServicePrices));
getTitle(title);
rollback = Math.trunc(getRandomArbitrary(1,100));
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);




showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log('Стоимость верстки экранов (' + screenPrice + ') рублей/ долларов/гривен/юани');
console.log('Стоимость разработки сайта (' + fullPrice + ') рублей/ долларов/гривен/юани');
console.log('Какие типы экранов нужно разработать', screens);
console.log(servicePercentPrice);
console.log(getArray(screens));
console.log(getRollbackMessage(fullPrice));

