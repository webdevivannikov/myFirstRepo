'use strict';

const appData = {
    rollback: 10,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    services: {},
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    asking: function() {
        do {
            appData.title = prompt('Как называется ваш проект?','Название проекта');
        } while(appData.isNumber(appData.title));
        

        for (let i = 0; i < 2; i++) {
            
            let name = '';
            let price = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?", 'Простые');
            } while(appData.isNumber(name));

            do {
                price = +prompt("Сколько будет стоить данная работа?", '5000');
            } while(!appData.isNumber(price)); 
            
            appData.screens.push({id: i, name: name, price: price});

        }


        appData.adaptive = confirm('Нужен ли адаптив на сайте');   

        for (let i = 0; i < 2; i++) {
            let name = '';
            let cost = 0;

            do {
                name = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1');
            } while(appData.isNumber(name));

            do{
                cost = +prompt('Сколько это будет стоить?', '1000');
            } while (!appData.isNumber(cost));

            appData.services[name] = +cost;
            
        }
    },
    addPrices: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.services){
            appData.allServicePrices += +appData.services[key];
        }
    },
    getTitle: function() {
        if ((appData.title !== null)) {
            if (appData.title.trim() != '') {
                appData.title = (appData.title[0].toUpperCase() + appData.title.slice(1)).trim();
            }    
        }
        
    },
    getServicePercentPrices: function() {
        appData.fullPrice = Math.round(appData.screenPrice + appData.allServicePrices);
        appData.servicePercentPrice = appData.fullPrice* (appData.rollback/100);
    },
    getArray: function(str){
        if (str != null)
            return str.toLowerCase().split(", ");
    },
    getRollbackMessage: function() {
        switch(true) {
            case appData.fullPrice >= 30000:
                return 'Даем скидку 10%';
            case appData.fullPrice >= 15000 && appData.fullPrice < 30000:
                return 'Даем скидку 5';
            case appData.fullPrice < 15000 && appData.fullPrice >= 0:
                return 'Скидка не предусмотрена';
            case appData.fullPrice < 0:
                return 'Что то пошло не так';
        }
    },
    logger: function() {
        console.log('Стоимость верстки экранов (' + appData.screenPrice + ') рублей/ долларов/гривен/юани');
        console.log('Стоимость разработки сайта (' + appData.fullPrice + ') рублей/ долларов/гривен/юани');
        console.log('Какие типы экранов нужно разработать', appData.screens);
        console.log(appData.rollback);
        console.log(appData.servicePercentPrice);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.screens);
        for(let key in appData){
            console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
        }
    },
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getTitle();
        appData.getServicePercentPrices();
        appData.logger();
    }
};
    

appData.start();
