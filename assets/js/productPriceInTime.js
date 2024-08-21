export class ProductPriceInTime {
  constructor(productPrice, salary, workingHours, workingDays, monthDays) {
    this.productPrice = parseFloat(productPrice);
    this.salary = parseFloat(salary);
    this.workingHours = parseFloat(workingHours);
    this.workingDays = parseFloat(workingDays);
    this.monthDays = monthDays ?? 22;
    this.earnedPerDay = 0;
    this.earnedPerHour = 0;
  }

  formatCurrency(amount, precision = 2) {
    let amountParsed = amount;
    if (typeof amountParsed !== 'number') {
      amountParsed = parseFloat(amount);
    }
    if (typeof amountParsed !== 'number') return null;
    return amountParsed.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }

  convertDecimalTime(decimal) {
    if (decimal > 23.99) {
      const dias = Math.floor(decimal / this.workingHours);
      const restHours = decimal % this.workingHours;
      const minutes = Math.round((restHours - Math.floor(restHours)) * 60);

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