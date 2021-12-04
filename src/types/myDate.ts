export class myDate{
    //attributes
    day: number;
    month: number;
    year: number;

    //methods
    constructor(day: number, month:number, year: number){
        this.day = day;
        this.month = month;
        this.year = year;
    }

    getDay(){
        return this.day;
    }

    getMonth(){
        return this.month;
    }

    getYear(){
        return this.year;
    }

    setDay(newDay: number){
        this.day = newDay;
    }

    setMonth(newMonth: number){
        this.month = newMonth;
    }

    setYear(newYear: number){
        this.year = newYear;
    }

    display(){
        console.log(this.day+"/"+this.month+"/"+this.year);
    }

    updateToday(){
        let dateTime = new Date();
        return new myDate(dateTime.getDay(), dateTime.getMonth(), dateTime.getFullYear());
    }
}