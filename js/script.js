'use strict';
let screens = document.querySelectorAll('.screen');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

const plusBtn = document.querySelector('.screen-btn');

const countBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const title = document.getElementsByTagName('h1')[0];

const otherItemsPersent =  document.querySelectorAll('div.other-items.percent');
const otherItemsNumber =  document.querySelectorAll('div.other-items.number');

const inputRange = document.querySelector('.rollback > div > input');
const spanRangeValue = document.querySelector('.rollback > div > span');


const appData = {
    rollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    screenPrice: 0,
    adaptive: true,
    screens: [],
    title: '',
    countInputs: 0,
    
    addTitle: function() {
        document.title = title.textContent;
    },
    init: function() {
        appData.addTitle();
        
        
        countBtn.addEventListener('click', function() {
            let flag = false;
            screens = document.querySelectorAll('.screen');
            screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if ((+select.value == 0) || (+input.value == 0))
                flag = true;
            });
            
            if (flag == false) {
                
                appData.start();
            }
            
            
           
        });
        plusBtn.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.getRollback);
    },
    start: function() {
        appData.screenPrice = 0;
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.fullPrice = 0;
        appData.rollback = +inputRange.value;
        appData.countInputs = 0;
        appData.screens = [];
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();
        appData.showResult();
    },
    getRollback: function() {
        spanRangeValue.textContent = inputRange.value + '%'; 

    },
    showResult: function() {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.fullPrice - appData.fullPrice * appData.rollback / 100;
        totalCount.value = appData.countInputs;

    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectedName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index, 
                name: selectedName, 
                price: +select.value * +input.value,
                count: +input.value
            });

        });
    },
    addServices: function() {
        otherItemsPersent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
        
    },
    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens = document.querySelectorAll('.screen');
        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
            appData.countInputs += +screen.count;
        }
        for (let key of appData.screens) {
            // += +screen.price;
        }

        for (let key in appData.servicesNumber){
            appData.servicePricesNumber += +appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent){
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
        }
        
        appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
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
    }
};
    
appData.init();

