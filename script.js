'use strict';

const appData = {
    rollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    service1: '',
    service2: '',
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    cost: 0,
    sum:0,
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    asking: function() {
        this.title = prompt('Как называется ваш проект?','Название проекта');
        this.screens = prompt("Какие типы экранов нужно разработать? (Перечислите через запятую)", 'Простые, сложные');
        this.screenPrice = prompt("Сколько будет стоить данная работа?");
        while(!this.isNumber(this.screenPrice)) {
            this.screenPrice = prompt("Сколько будет стоить данная работа?", '5000');
        }
        this.screenPrice = +this.screenPrice.toString().trim();
        this.adaptive = confirm('Нужен ли адаптив на сайте');   
    },
    getAllServicePrices: function() {
        for (let i = 0; i < 2; i++) {
            if (i === 0){
                this.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга1');
            } else if (i === 1) {
                this.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга2');
            }
            this.cost = prompt('Сколько это будет стоить?', '1000');
            while (!this.isNumber(this.cost)){
                this.cost = prompt('Сколько это будет стоить?', '1000');
            }
            this.sum += +this.cost.toString().trim();
            
        }
    },
    getTitle: function(){
        if ((this.title !== null)) {
            if (this.title.trim() != '') {
                return (this.title[0].toUpperCase() + this.title.slice(1)).trim();
            }    
        }
        
    },
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    },
    getServicePercentPrices: function(total, percent){
        return total* (percent/100);
    },
    getArray: function(str){
        if (str != null)
            return str.toLowerCase().split(", ");
    },
    getRollbackMessage: function() {
        switch(true) {
            case this.fullPrice >= 30000:
                return 'Даем скидку 10%';
            case this.fullPrice >= 15000 && this.fullPrice < 30000:
                return 'Даем скидку 5';
            case this.fullPrice < 15000 && this.fullPrice >= 0:
                return 'Скидка не предусмотрена';
            case this.fullPrice < 0:
                return 'Что то пошло не так';
        }
    },
    logger: function() {
        console.log('Стоимость верстки экранов (' + this.screenPrice + ') рублей/ долларов/гривен/юани');
        console.log('Стоимость разработки сайта (' + this.fullPrice + ') рублей/ долларов/гривен/юани');
        console.log('Какие типы экранов нужно разработать', this.screens);
        console.log(this.rollback);
        console.log(this.servicePercentPrice);
        console.log(this.getArray(this.screens));
        console.log(this.getRollbackMessage(this.fullPrice));
        for(let key in appData){
            console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
        }
    },
    start: function() {
        this.asking();
        this.getAllServicePrices();
        this.fullPrice = Math.round(this.screenPrice + this.sum);
        this.getTitle(this.title);
        this.rollback = Math.trunc(this.getRandomArbitrary(1,100));
        this.servicePercentPrice = this.getServicePercentPrices(this.fullPrice, this.rollback);
        this.logger();
    }
};
    

appData.start();
