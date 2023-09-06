import utils from './utils/utils';
export class ProductPriceInTime {
  constructor(productPrice, salary, workingHours, workingDays, lang) {
    this.productPrice = parseFloat(productPrice);
    this.salary = parseFloat(salary);
    this.workingHours = parseFloat(workingHours);
    this.workingDays = parseFloat(workingDays);
    this.monthDays = 22;
    this.lang = lang;
  }

  constructor() {
    this.earnedPerDay = 0;
    this.earnedPerHour = 0;
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

  getTime() {
    return utils.convertHourInTime(this.productValueInHours, this.workingHours, this.monthDays);
  }

  productValueInHours() {
    return this.productPrice / this.getEarnPerHour();
  }

  productValueInDays() {
    return this.productValueInHours() / this.workingHours;
  }
}
