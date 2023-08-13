class ProductPriceInTime {
  constructor(productPrice, salary, workingHours, workingDays, lang) {
    this.productPrice = parseFloat(productPrice);
    this.salary = parseFloat(salary);
    this.workingHours = parseFloat(workingHours);
    this.workingDays = parseFloat(workingDays);
    this.monthDays = 22;
    this.earnedPerDay = 0;
    this.earnedPerHour = 0;
    this.lang = lang;
  }

  formatCurrency(amount, language = 'pt-BR', currency = 'BRL', precision = 2) {
    if (this.lang === 'en') {
      currency = 'USD';
    }
    let amountParsed = amount;
    if (typeof amountParsed !== 'number') {
      amountParsed = parseFloat(amount);
    }
    if (typeof amountParsed !== 'number') return null;
    return amountParsed.toLocaleString(language, {
      style: 'currency',
      currency,
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }

  convertDecimalTime(decimal) {
    if (decimal > 23.99) {
      const dias = Math.floor(decimal / this.workingHours);
      const restHours = decimal % this.workingHours;
      const minutes = Math.round((restHours - Math.floor(restHours)) * 60);

      if (this.lang === 'br') {
        return `${dias} dias, ${Math.floor(restHours)} horas e ${minutes} minutos`;
      } else if (this.lang === 'en') {
        return `${dias} days, ${Math.floor(restHours)} hours and ${minutes} minutes`;
      }
    }
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);

    if (this.lang === 'br') {
      return `${hours ? hours + ' horas e ' : ''}${minutes} minutos`;
    } else if (this.lang === 'en') {
      return `${hours ? hours + ' hours and ' : ''}${minutes} minutes`;
    }
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
