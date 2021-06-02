import { ViewType } from '../enums/enums'
import { width } from '@material-ui/system';
import Year from './year';

export default class CalendarData{
    isLoading : boolean;
    data: Calendar;
}

export class Calendar{
    date : Date
    month: string
    year: string
    viewType : ViewType
    startDayOfWeek: number
    startDayOfMonth : Date
    endDayOfMonth : Date
    dayData : DayRow[]
    monthData : string[]
    yearData : Year[]
    headers : any[]
    minDate : Date
    maxDate : Date
    calendarStartDate : Date
    calendarEndDate : Date
    width:number;
    isMinDate: boolean;
    isMaxDate: boolean;

    constructor(date : Date = new Date(), dow : number = 0){
        this.date = date;  
        this.startDayOfWeek = dow;     
        this.viewType = ViewType.day;
    }    
}

export interface DayRow{
    rowNo : number
    rowData : DayCell[]
}

export interface DayCell{
    date : Date
    day : number
    index : number   
    dayType : string 
    dayStatus : string
}
