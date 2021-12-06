/**
 * Our Date implementation
 */
export class MyDate {
  //attributes
  private day: number;
  private month: number;
  private year: number;

  //methods
  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  getDay() {
    return this.day;
  }

  getMonth() {
    return this.month;
  }

  getYear() {
    return this.year;
  }

  setDay(newDay: number) {
    this.day = newDay;
  }

  setMonth(newMonth: number) {
    this.month = newMonth;
  }

  setYear(newYear: number) {
    this.year = newYear;
  }

  serialize() {
    return {
      day: this.day,
      month: this.month,
      year: this.year,
    };
  }

  toString(): string {
    return this.day + "/" + this.month + "/" + this.year;
  }

  display() {
    console.log(this.day + "/" + this.month + "/" + this.year);
  }

  updateToday() {
    let dateTime = new Date();
    return new MyDate(
      dateTime.getDay(),
      dateTime.getMonth(),
      dateTime.getFullYear()
    );
  }
}
