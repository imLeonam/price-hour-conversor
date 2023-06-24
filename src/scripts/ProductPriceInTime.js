// Preço do produto em horas = (preço do produto / (((salario / dias trabalhados no mês) / horas trabalhadas por dia) / horas trabalhadas por dia))

class ProductPriceInTime {
  constructor(productPrice, salary, workingHours, workingDays) {
    this.productPrice = productPrice;
    this.salary = salary;
    this.workingHours = workingHours;
    this.workingDays = workingDays;
    this.monthDays = 22;
    this.earnedPerDay = 0;
    this.earnedPerHour = 0;
  }

  convertDecimalTime(decimal) {
    if (decimal > 23.99) {
      const dias = Math.floor(decimal / this.workingHours);
      const restHours = decimal % this.workingHours;
      const minutes = Math.round((restHours - Math.floor(restHours)) * 60);
      console.log(dias, restHours, minutes)

      return `${dias} dias, ${Math.floor(restHours)} horas e ${minutes} minutos`;
    }
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);

    return `${hours ? hours + ' horas e ' : ''}${minutes} minutos`;
  }

  myValuePerHour() {
    const utilHoursPerWeek = this.workingDays * this.workingHours;
    const monthWeeks = 4;

    const totalHourPerMonth = utilHoursPerWeek * monthWeeks;
    const result = this.salary / totalHourPerMonth;

    return result;
  }

  myValuePerHourMonth() {
    this.earnedPerDay = this.salary / this.monthDays;
    this.earnedPerHour = this.earnedPerDay / this.workingHours;
  }

  getProductPrice() {
    return this.productPrice;
  }

  getEarnPerDay() {
    this.myValuePerHourMonth();
    return this.earnedPerDay;
  }

  getEarnPerHour() {
    this.myValuePerHourMonth();
    return this.earnedPerHour;
  }

  getSalary() {
    return this.salary;
  }

  productValueInHours() {
    return this.productPrice / this.getEarnPerHour();
  }

  productValueInDays() {
    return this.productValueInHours() / this.workingHours;
  }
}

const productHourPrice = new ProductPriceInTime(233, 3500, 8, 5);

const valueHours = productHourPrice.getEarnPerHour();
const valueDays = productHourPrice.getEarnPerDay();
const salary = productHourPrice.getSalary();
const realProdPrice = productHourPrice.getProductPrice();
const totalProdHoursPrice = productHourPrice.productValueInHours();
const formattedProdHourPrice = productHourPrice.convertDecimalTime(totalProdHoursPrice);

console.log('Você ganha R$', salary.toFixed(2));
console.log('Você ganha R$', valueDays.toFixed(2), 'por dia');
console.log('Você ganha R$', valueHours.toFixed(2), 'por hora');
console.log('O Gasto é R$', realProdPrice.toFixed(2));
console.log('Você precisa trabalhar', formattedProdHourPrice, 'para pagar isso.');
console.log('Um total de', totalProdHoursPrice.toFixed(2), 'horas.');