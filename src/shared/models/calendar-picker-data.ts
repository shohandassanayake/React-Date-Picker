import { ViewType } from '../enums'

export default class CalendarPicker{
    date : Date
    month: string
    year: string
    viewType : ViewType
    startDayOfWeek: number
    startDayOfMonth : Date
    endDayOfMonth : Date
    dayData : DayRow[]
    monthData : string[]
    yearData : any[]
    headers : any[]

    calendarStartDate : Date
    calendarEndDate : Date

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
