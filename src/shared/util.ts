import CalendarData, { DayRow } from './models/calendar-picker-data';

const dayTitleShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const dayTitleShortCap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const dayTitle = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthsTitle =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsTitleShort =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getHeadersForCalendar = (startDayOfWeek : number) => {
    return dayTitleShortCap.slice(startDayOfWeek).concat(dayTitleShortCap.slice(0, startDayOfWeek))
}

const getMonthsForCalendar = () => {
    return monthsTitleShort;
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

const getDayShortName = (date: Date) => {
    return dayTitleShort[date.getDay()];
}

const getDayLongName = (date: Date) => {
    return dayTitle[date.getDay()];
}

const getMonthShortName = (date: Date) => {
    return monthsTitleShort[date.getMonth()];
}

const getMonthLongName = (date: Date) => {
    return monthsTitle[date.getMonth()];
}

const getYear = (date: Date) => {
    return date.getFullYear().toString();
}

const formatDate = (date : Date, format : string) => {   

    var letters = format.split('');
    var letterGroups = [];
    var group =letters[0];
    var formatedDate = ''
    for(var i = 0; i < letters.length; i++){

        if(letters[i + 1] && letters[i] === letters[i+1]){
            group = group + letters[i + 1]
        }
        else{
            //letterGroups.push(group);
            formatedDate = formatedDate + getDateFormatValue(date, group);
            group = letters[i + 1] ? letters[i + 1] : '';
        }
    }
    
    return formatedDate;
}

const getDateFormatValue = (date : Date, formatVal : string) => {
    switch(formatVal){
        case 'dd':
            return ('0' + date.getDate()).slice(-2);
        case 'ddd':
            return getDayShortName(date);
        case 'dddd':
            return getDayLongName(date);
        case 'MM':
            return ('0' + date.getMonth()).slice(-2); 
        case 'MMM':
            return getMonthShortName(date);
        case 'MMMM':
            return getMonthLongName(date);
        case 'yyyy':
            return date.getFullYear();   
        case '/':
        case '-':
            return formatVal;  

    }
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
    formatDate
}