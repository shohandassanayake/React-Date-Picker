import CalendarData, { DayRow } from './models/calendar-picker-data';

const dayTitleShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const dayTitleShortCap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MonthsTitle =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MonthsTitleShort =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getHeadersForCalendar = (startDayOfWeek : number) => {
    return dayTitleShortCap.slice(startDayOfWeek).concat(dayTitleShortCap.slice(0, startDayOfWeek))
}

const getMonthsForCalendar = () => {
    return MonthsTitleShort;
}

const getYearsForCalendar = (year) => {
    var mod = year % 10;
    var startYear = year - mod - 1;
    var endYear = startYear + 12;
    var years =[];
    for(var i = startYear; i < endYear; i++){
        years.push(i);
    }
    return years;
}

const getYearsLabel = (year) => {
    var mod = year % 10;
    var startYear = year - mod - 1;
    var endYear = startYear + 11;
    return startYear + ' - ' + endYear;
}

const getCalendarDays = (data : CalendarData) => {
    let calendarRows : DayRow[] = []
    let calStartDay =  new Date(data.calendarStartDate);
    let totalDays = getDateDifferenceInDays(data.calendarEndDate, data.calendarStartDate);
    let noOfRows = totalDays/7;

    for(let i = 0; i < noOfRows; i++){
        let row : DayRow = {rowNo : i, rowData : []}

        for(let j = 0; j < 7; j++){

            let date =  new Date(calStartDay)
            row.rowData.push({
                date :date,
                day : date.getDate(),
                index : (i * 7) + j,
                dayType : (data.startDayOfMonth <= date && date <= data.endDayOfMonth ? 'month-in-day' : 'month-out-day'  ),
                workingStatus : ''
                })

            calStartDay.setDate(calStartDay.getDate() + 1);
        }
        calendarRows.push(row);
    }
    return calendarRows;
}  

const getStartDayOfCalendar = (date : Date, startDayOfWeek : number) => {
    var lessDays = startDayOfWeek == 0 ? 6 : startDayOfWeek - 1;
    return new Date(new Date(date).setDate(date.getDate() - lessDays));
}

const getEndDayOfCalendar = (date : Date, startDayOfWeek: number) => {
    var wkStart = getStartDayOfCalendar(date, startDayOfWeek);
    return new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
}

const getDateDifferenceInDays = (startDate : any , endDate : any) => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

const getStartDayOfMonth = (date : Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

const getEndDayOfMonth = (date : Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

const getMonthShortName = (date: Date) => {
    return MonthsTitleShort[date.getDay()];
}

const getMonthLongName = (date: Date) => {
    return MonthsTitle[date.getDay()];
}

const getYear = (date: Date) => {
    return date.getFullYear().toString();
}




export default {
    getYearsForCalendar,
    getYearsLabel,
    getMonthsForCalendar,
    getHeadersForCalendar,
    getStartDayOfCalendar,
    getEndDayOfCalendar,
    getCalendarDays,
    getStartDayOfMonth,
    getEndDayOfMonth,
    getMonthShortName,
    getMonthLongName,
    getYear,
}