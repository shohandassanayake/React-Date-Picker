import React from 'react';
import {DateChangeType} from '../../shared/enums/enums'
import CalendarUtil from '../../shared/utils/calendar-util'
import DateUtil from '../../shared/utils/date-util'

import './month-view.scss'
import Month from '../../shared/models/month';

export default function MonthView(props): JSX.Element {
    const width = props.data.width/3 - 8;
    const height = props.data.width/4 - 8;
    const monthData =  CalendarUtil.getMonthsForCalendar();
    let minYearDate =  DateUtil.getStartDayOfYear(props.data.date);
    let maxYearDate =  DateUtil.getEndDayOfYear(props.data.date);
    

    if(props.data.minDate >= minYearDate && props.data.minDate <= maxYearDate){
        let minMonth = props.data.minDate.getMonth()
        for(let i = 0; i < minMonth;i++){
            monthData[i].class = 'disable-month'
        }
    }
    
    if(props.data.maxDate >= minYearDate && props.data.maxDate <= maxYearDate){
        let maxMonth = props.data.maxDate.getMonth()
        for(let i = maxMonth + 1; i < 12;i++){
            monthData[i].class = 'disable-month'
        }
    }

    const onMonthChange = (month) => {      
        props.onDateChange(DateChangeType.month, month)
    }

console.log('Month-View-Rendered')
    return (
            <div className='month-view'>
            {monthData.map((month: Month, index : number) => 
                <div key={index} className={`month-cell ${month.class}`} onClick={() => onMonthChange(index)} style={{height:height , width: width}}>                            
                    <div className='month-item'>{month.name}</div>                                    
                </div>
            )}
        </div>          
    )    
}