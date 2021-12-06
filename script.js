'use strict';

let rollback;
let fullPrice;
let servicePercentPrice;
let allServicePrices;
let service1;
let service2;
let title;
let screens;
let screenPrice;
let adaptive;
let cost;

    
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getFullPrice(priceScreen, pricesService){
    return priceScreen + pricesService;
}

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
    title = prompt('Как называется ваш проект?','Название проекта');
    screens = prompt("Какие типы экранов нужно разработать? (Перечислите через запятую)", 'Простые, сложные');
    screenPrice = prompt("Сколько будет стоить данная работа?");
    while(!isNumber(screenPrice)) {
        screenPrice = prompt("Сколько будет стоить данная работа?", '5000');
    }
    screenPrice = +screenPrice.toString().trim();
    adaptive = confirm('Нужен ли адаптив на сайте');   
};

const getAllServicePrices = function(){
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0){
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2');
        }
        cost = prompt('Сколько это будет стоить?', '1000');
        while (!isNumber(cost)){
            cost = prompt('Сколько это будет стоить?', '1000');
        }
        sum += +cost.toString().trim();
        

    }
    return sum;
};

const getTitle = function(str){
    if ((str !== null)) {
        if (str.trim() != '') {
            return (str[0].toUpperCase() + str.slice(1)).trim();
        }    
    }
    
};

const getServicePercentPrices = function(total, percent){
    return total* (percent/100);
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


asking();
allServicePrices = getAllServicePrices();
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
console.log(rollback);
console.log(servicePercentPrice);
console.log(getArray(screens));
console.log(getRollbackMessage(fullPrice));

