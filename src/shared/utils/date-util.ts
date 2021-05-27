import Common from './common-util'

const getStartDayOfCalendar = (date : Date, startDayOfWeek : number) => {
    var d = new Date(date);
    return new Date(d.setDate(d.getDate() - d.getDay() + startDayOfWeek));
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

const getStartDayOfYear = (date : Date) => {
    return new Date(date.getFullYear(), 0, 1);
}

const getEndDayOfYear = (date : Date) => {
    return new Date(date.getFullYear(), 12, 31);
}

const getYear = (date: Date) => {
    return date.getFullYear().toString();
}

const getDayShortName = (date: Date) => {
    return Common.dayTitleShort[date.getDay()];
}

const getDayLongName = (date: Date) => {
    return Common.dayTitle[date.getDay()];
}

const getMonthShortName = (date: Date) => {
    return Common.monthsTitleShort[date.getMonth()];
}

const getMonthLongName = (date: Date) => {
    return Common.monthsTitle[date.getMonth()];
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
            return ('0' + (date.getMonth() + 1)).slice(-2); 
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
    getStartDayOfCalendar,
    getDateDifferenceInDays,
    getEndDayOfCalendar,
    getStartDayOfMonth,
    getEndDayOfMonth,
    getStartDayOfYear,
    getEndDayOfYear,
    getYear,
    formatDate,
    getDayShortName,
    getDayLongName,
    getMonthShortName,
    getMonthLongName
}