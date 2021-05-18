import React, { useState, useEffect } from 'react';

import './calendar.scss'

import CalendarNav from '../../../components/calendar-nav/calendar-nav'
import DayView from '../../../components/day-view/day-view'
import MonthView from '../../../components/month-view/month-view'
import YearView from '../../../components/year-view/year-view';


import CalendarData from '../../../shared/models/Calendar-picker-data'
import DatePicker from '../../../shared/models/Date-picker'

import CalendarUtil from '../../../shared/util'
import {ViewType, DateChangeType} from '../../../shared/enums'

export default function Calendar(props): JSX.Element {

console.log('Calendar-Rendered')

const GenerateDateObj = (date = new Date, dow = 0) => {
    var data = new CalendarData(date,dow);
    data.startDayOfMonth = CalendarUtil.getStartDayOfMonth(data.date);
    data.endDayOfMonth = CalendarUtil.getEndDayOfMonth(data.date);
    data.month = CalendarUtil.getMonthShortName(data.date);
    data.year = CalendarUtil.getYear(data.date);
    data.calendarStartDate = CalendarUtil.getStartDayOfCalendar(data.startDayOfMonth, data.startDayOfWeek);
    data.calendarEndDate = CalendarUtil.getEndDayOfCalendar(data.endDayOfMonth, data.startDayOfWeek);
    data.dayData= CalendarUtil.getCalendarDays(data);
    data.headers = CalendarUtil.getHeadersForCalendar(0);

    return data;
}

const [viewType, setViewType] = useState<ViewType>(ViewType.day); 
const [calendar, setCalendar] = useState<DatePicker>({
    isLoading : true,
    data : null
});

useEffect(() => { 
        getData();
},[])  

const getData = (date = new Date) => {
    setCalendar({
        isLoading : true,
        data : calendar.data
    });
    //setTimeout(() => {    
        var calendarData = GenerateDateObj(date);
        calendarData.dayData[1].rowData[2].workingStatus = 'working'
        calendarData.dayData[1].rowData[4].workingStatus = 'holiday'
        calendarData.dayData[2].rowData[5].workingStatus = 'absence'
        calendarData.dayData[2].rowData[3].workingStatus = 'working-absence'
        calendarData.dayData[3].rowData[6].workingStatus = 'working-holiday'
        calendarData.dayData[3].rowData[1].workingStatus = 'partial-absence'
        calendarData.dayData[3].rowData[3].workingStatus = 'partial-holiday' 
        calendarData.dayData[3].rowData[5].workingStatus = 'working-absence-holiday' 
        
        
            setCalendar({
                isLoading : false,
                data : calendarData
            });
    //},500)  
}  

const onDateChange = (type, val : any = '') =>{
    switch(type)
    {
        case DateChangeType.nextDay :
        {
            getData(new Date(calendar.data.date.setMonth(calendar.data.date.getMonth() + 1)));
            break;
        }
        case DateChangeType.prevDay :
        default:  
        {
            getData(new Date(calendar.data.date.setMonth(calendar.data.date.getMonth() - 1)));
            break;
        }
        case DateChangeType.month :  
        {
            getData(new Date(calendar.data.date.setMonth(parseInt(val))));
            setViewType(ViewType.day)
            break;
        }
        case DateChangeType.year :
        {
            getData(new Date(calendar.data.date.setFullYear(parseInt(val))));                
            setViewType(ViewType.day)
            break;
        }
        case DateChangeType.prevMonth:
        case DateChangeType.nextMonth:
        case DateChangeType.prevYear:
        case DateChangeType.nextYear:
        {
            const newStore : DatePicker = {...calendar};
            newStore.data.date = new Date(calendar.data.date.setFullYear(parseInt(val)))
            newStore.data.year = CalendarUtil.getYear(newStore.data.date)
            setCalendar(newStore);
            break;
        } 
    }
}

const onViewChange = (viewType) => {        
    setViewType(viewType);
}

const loadViewType = () => {
    switch(viewType) {
        case ViewType.day:
            default:
            return <DayView
                    headers={calendar.data.headers}
                    dayData={calendar.data.dayData}
                    setDate={props.setDate}
                    ></DayView>
        case ViewType.month:
            return <MonthView
                    onDateChange={onDateChange}
                    ></MonthView>
        case ViewType.year:
            return <YearView
                    year={calendar.data.year}
                    onDateChange={onDateChange}
                    ></YearView>      
    }
}   

    return (
        <div>
            {!calendar.isLoading ?       
            <div className='calendar'>
                <CalendarNav
                        date={calendar.data.date}
                        month={calendar.data.month}
                        year={calendar.data.year}
                        viewType={viewType}
                        onViewChange={onViewChange}
                        onDateChange={onDateChange}
                ></CalendarNav>
                <div className='body'>
                        {loadViewType()}
                </div>            
            </div>
            :
            <div>Loading...</div>
            }
        </div>
    )    
}