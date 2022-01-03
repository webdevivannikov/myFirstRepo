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
    
    reset: function() {
        countBtn.style = "display: block;";
        resetBtn.style = "display: none;";
        screens.forEach( (screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (index == 0) {   
                select.disabled = false;
                input.disabled = false;
                input.value = '';
                select.value = '';
            }
            else {
                select.remove();
                input.remove();
            }
        });
    },
    addTitle: function() {
        document.title = title.textContent;
    },
    init: function() {
        this.addTitle();
        
        
        countBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            let flag = false;
            screens = document.querySelectorAll('.screen');
            screens.forEach( screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if ((+select.value == 0) || (+input.value == 0))
                flag = true;
            });
            
            if (flag == false) {
                screens.forEach( screen => {
                    const select = screen.querySelector('select');
                    const input = screen.querySelector('input');
                    select.disabled = true;
                    input.disabled = true;
                });
                countBtn.style = "display: none;";
                resetBtn.style = "display: block;";
                this.start();
            }
            
            
           
        });
        plusBtn.addEventListener('click', () => this.addScreenBlock());
        inputRange.addEventListener('input', () => this.getRollback());
        
        resetBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.reset();
        });
    },
    start: function() {
        this.screenPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.rollback = +inputRange.value;
        this.countInputs = 0;
        this.screens = [];
        this.addScreens();
        this.addServices();
        this.addPrices();
        // appData.logger();
        this.showResult();
    },
    getRollback: function() {
        spanRangeValue.textContent = inputRange.value + '%'; 

    },
    showResult: function() {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.fullPrice - this.fullPrice * this.rollback / 100;
        totalCount.value = this.countInputs;

    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        screens.forEach( (screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectedName = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index, 
                name: selectedName, 
                price: +select.value * +input.value,
                count: +input.value
            });

        });
    },
    addServices: function() {
        otherItemsPersent.forEach( item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach( item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
        
    },
    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens = document.querySelectorAll('.screen');
        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function() {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
            this.countInputs += +screen.count;
        }
        for (let key in this.servicesNumber){
            this.servicePricesNumber += +this.servicesNumber[key];
        }
        for (let key in this.servicesPercent){
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
        }
        
        this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
    },
    logger: function() {
        console.log('Стоимость верстки экранов (' + this.screenPrice + ') рублей/ долларов/гривен/юани');
        console.log('Стоимость разработки сайта (' + this.fullPrice + ') рублей/ долларов/гривен/юани');
        console.log('Какие типы экранов нужно разработать', this.screens);
        console.log(this.rollback);
        console.log(this.servicePercentPrice);
        console.log(this.getRollbackMessage(this.fullPrice));
        console.log(this.screens);
        for(let key in appData){
            console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
        }
    }
};
    
appData.init();

