import { ProductPriceInTime } from './productPriceInTime.js';

const resultsContainer = document.querySelector('.expanded-panel');
const salaryResult = document.querySelector('#salaryResult');
const valueDaysResult = document.querySelector('#valueDaysResult');
const valueHoursResult = document.querySelector('#valueHoursResult');
const realProdPriceResult = document.querySelector('#realProdPriceResult');
const workTimeNeededResult = document.querySelector('#workTimeNeededResult');
const workTotalHourResult = document.querySelector('#workTotalHourResult');

function checkWorkingTime(hours, days) {
    if (hours > 21) {
        window.alert('Você esta trabalhando demais, busque ajuda!');
        return;
    }
    if (days > 7) {
        window.alert('As semanas só tem 7 dias!');
        return;
    }
}

function onSubmit() {
    const salary = document.querySelector('#salary').value;
    const hoursPerDay = document.querySelector('#hoursPerDay').value;
    const daysPerWeek = document.querySelector('#daysPerWeek').value;
    const comparationValue = document.querySelector('#comparationValue').value;

    checkWorkingTime(hoursPerDay, daysPerWeek);

    const productHourPrice = new ProductPriceInTime(
        comparationValue,
        salary,
        hoursPerDay,
        daysPerWeek,
    );

    const valueHours = productHourPrice.getEarnPerHour();
    const valueDays = productHourPrice.getEarnPerDay();
    const salaryValue = productHourPrice.getSalary();
    const realProdPrice = productHourPrice.getProductPrice();
    const totalProdHoursPrice = productHourPrice.productValueInHours();
    const formattedProdHourPrice = productHourPrice.convertDecimalTime(totalProdHoursPrice);

    salaryResult.innerText = 'Você ganha ' + productHourPrice.formatCurrency(salaryValue);
    valueDaysResult.innerText = productHourPrice.formatCurrency(valueDays) + ' por dia';
    valueHoursResult.innerText = productHourPrice.formatCurrency(valueHours) + ' por hora';

    realProdPriceResult.innerText = 'O Gasto é ' + realProdPrice;
    workTimeNeededResult.innerText = 'Você precisa trabalhar ' + formattedProdHourPrice + ' para pagar isso.';
    workTotalHourResult.innerText = 'Aproximadamente ' + totalProdHoursPrice.toFixed(2) + ' horas.';
    if (comparationValue === 0) {
        realProdPriceResult.innerText = '';
        workTimeNeededResult.innerText = '';
        workTotalHourResult.innerText = '';
    }

    resultsContainer.classList.add('active');
}

function onReset() {
    resultsContainer.classList.remove('active');
    
    salaryResult.innerText = '';
    valueDaysResult.innerText = '';
    valueHoursResult.innerText = '';
    realProdPriceResult.innerText = '';
    workTimeNeededResult.innerText = '';
    workTotalHourResult.innerText = '';
}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('teset');
    onSubmit();
});

form.addEventListener('reset', () => {
    onReset();
});

