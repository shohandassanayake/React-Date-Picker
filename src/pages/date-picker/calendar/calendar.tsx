import React, { useState, useEffect } from 'react';

import './calendar.scss'

import CalendarNav from '../../../components/calendar-nav/calendar-nav'
import DayView from '../../../components/day-view/day-view'
import MonthView from '../../../components/month-view/month-view'
import YearView from '../../../components/year-view/year-view';


import CalendarData, {Calendar} from '../../../shared/models/calendar-data'
import DatePicker from '../../../shared/models/date-picker-data'

import CalendarUtil from '../../../shared/utils/calendar-util'
import DateUtil from '../../../shared/utils/date-util'
import {ViewType, DateChangeType} from '../../../shared/enums/enums'
import { width } from '@material-ui/system';

export default function CalendarComp(props): JSX.Element {

console.log(props.width);
console.log('Calendar-Rendered')

const GenerateDateObj = (date = new Date, dow = 0) => {
    var data = new Calendar(date,dow);
    data.minDate = props.minDate; 
    data.maxDate = props.maxDate;
    data.width = props.width - 20;
    data.startDayOfMonth = DateUtil.getStartDayOfMonth(data.date);
    data.endDayOfMonth = DateUtil.getEndDayOfMonth(data.date);
    data.month = DateUtil.getMonthShortName(data.date);
    data.year = DateUtil.getYear(data.date);
    data.calendarStartDate = DateUtil.getStartDayOfCalendar(data.startDayOfMonth, data.startDayOfWeek);
    data.calendarEndDate = DateUtil.getEndDayOfCalendar(data.endDayOfMonth, data.startDayOfWeek);
    data.dayData= CalendarUtil.getCalendarDays(data);
    data.headers = CalendarUtil.getHeadersForCalendar(dow);
    data.isMinDate = data.minDate && data.minDate >= data.startDayOfMonth;
    data.isMaxDate = data.maxDate && data.maxDate <= data.endDayOfMonth;
    return data;
}

const [viewType, setViewType] = useState<ViewType>(ViewType.day); 
const [calendar, setCalendar] = useState<CalendarData>({
    isLoading : true,
    data : null
});

useEffect(() => { 
    loadCalendarPicker(props.date);
},[props.date])  

const loadCalendarPicker = (date = new Date) => {
    setCalendar({
        isLoading : true,
        data : calendar.data
    });
    //setTimeout(() => {    
        var calendarData = GenerateDateObj(date);
        calendarData.dayData[0].rowData[6].dayStatus = 'holiday'
        calendarData.dayData[1].rowData[2].dayStatus = 'working'
        calendarData.dayData[0].rowData[6].dayStatus = 'holiday'
        calendarData.dayData[1].rowData[5].dayStatus = 'holiday'
        calendarData.dayData[2].rowData[5].dayStatus = 'absence'
        calendarData.dayData[2].rowData[3].dayStatus = 'working-absence'
        calendarData.dayData[3].rowData[6].dayStatus = 'working-holiday'
        calendarData.dayData[3].rowData[1].dayStatus = 'partial-absence'
        calendarData.dayData[3].rowData[3].dayStatus = 'partial-holiday' 
        calendarData.dayData[0].rowData[6].dayStatus = 'holiday'
       calendarData.dayData[3].rowData[5].dayStatus = 'working-absence-holiday' 
        
        
            setCalendar({
                isLoading : false,
                data : calendarData
            });
    //},500)  
}  

const onDateChange = (type, val : any = '') =>{
    switch(type)
    {
        case DateChangeType.day:{     
            props.onDateChange(new Date(val), true);      
            break;
        }
        case DateChangeType.nextDay :
        {
            props.onDateChange(new Date(calendar.data.date.setMonth(calendar.data.date.getMonth() + 1)), false);
            setViewType(ViewType.day)   
            break;
        }
        case DateChangeType.prevDay :
        default:  
        {
            props.onDateChange(new Date(calendar.data.date.setMonth(calendar.data.date.getMonth() - 1)), false);
            setViewType(ViewType.day)   
            break;
        }
        case DateChangeType.month :  
        {
            props.onDateChange(new Date(calendar.data.date.setMonth(parseInt(val))), false);
            setViewType(ViewType.day)
            break;
        }
        case DateChangeType.year :
        {
            props.onDateChange(new Date(calendar.data.date.setFullYear(parseInt(val))), false);                
            setViewType(ViewType.day)
            break;
        }
        case DateChangeType.prevMonth:
        case DateChangeType.nextMonth:
        case DateChangeType.prevYear:
        case DateChangeType.nextYear:
        {
            const newStore : CalendarData = {...calendar};
            newStore.data.date = new Date(calendar.data.date.setFullYear(parseInt(val)))
            newStore.data.year = DateUtil.getYear(newStore.data.date)
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
                    onDateChange={onDateChange} 
                    data={calendar.data}                   
                    ></DayView>
        case ViewType.month:
            return <MonthView
                    onDateChange={onDateChange} 
                    data={calendar.data}                      
                    ></MonthView>
        case ViewType.year:
            return <YearView
                    onDateChange={onDateChange}
                    data={calendar.data}
                    ></YearView>      
    }
}   

    return (
        <div>
            {!calendar.isLoading ?    
            
            <div className='calendar' style={{width:calendar.data.width}}>
                <CalendarNav
                    data={calendar.data}
                    viewType={viewType}
                    onViewChange={onViewChange}
                    onDateChange={onDateChange}
                ></CalendarNav>
                <div className='body'>
                        {loadViewType()}
                </div>
            </div> 
            :
            void 0
            }
        </div>
    )    
}