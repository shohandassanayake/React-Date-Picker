import CalendarData, { DayRow } from '../models/calendar-picker-data';
import Month from '../models/month';
import Year from '../models/year';
import DateUtil from './date-util'
import Common from './common-util'

const getHeadersForCalendar = (startDayOfWeek : number) => {
    return Common.dayTitleShortCap.slice(startDayOfWeek).concat(Common.dayTitleShortCap.slice(0, startDayOfWeek))
}

const getMonthsForCalendar = () => {
    let months : Month[] =  [];
    for(let i = 0; i < 12; i++){
        months.push({
            name: Common.monthsTitleShort[i],
            class: ''
        })
    }
    return months;
}

const getYearsForCalendar = (year) => {
    var mod = year % 10;
    var startYear = year - mod - 1;
    var endYear = startYear + 12;
    let years : Year[] =  [];
    for(var i = startYear; i < endYear; i++){
        years.push({
            name: i.toString(),
            year: i,
            class: ''
        });
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
    let totalDays = DateUtil.getDateDifferenceInDays(data.calendarEndDate, data.calendarStartDate);
    //let noOfRows = totalDays/7;
    let currentDate = new Date().toLocaleDateString();;
    let monthStartDay = data.minDate && ((data.date.getFullYear() == data.minDate.getFullYear() && data.date.getMonth() == data.minDate.getMonth()) || data.endDayOfMonth < data.minDate) ? data.minDate : data.startDayOfMonth;
    let monthEndDay = data.maxDate && ((data.date.getFullYear() == data.maxDate.getFullYear() && data.date.getMonth() == data.maxDate.getMonth()) || data.maxDate < data.startDayOfMonth) ? data.maxDate : data.endDayOfMonth
    
    for(let i = 0; i < 6; i++){
        let row : DayRow = {rowNo : i, rowData : []}

        for(let j = 0; j < 7; j++){

            let date =  new Date(calStartDay)
            var rowData = {
                date :date,
                day : date.getDate(),
                index : (i * 7) + j,
                dayType : '',
                dayStatus : ''
            }

                if(monthStartDay <= date && date <= monthEndDay ){
                    rowData.dayType = 'month-in-day'
                    if(currentDate == date.toLocaleDateString()){
                        rowData.dayStatus = rowData.dayStatus + ' current-day'
                    }
                }
                else{
                    rowData.dayType = 'month-out-day' 
                }                

                row.rowData.push(rowData)

            calStartDay.setDate(calStartDay.getDate() + 1);
        }
        calendarRows.push(row);
    }
    return calendarRows;
}  



export default {
    getYearsForCalendar,
    getYearsLabel,
    getMonthsForCalendar,
    getHeadersForCalendar,
    getCalendarDays
}