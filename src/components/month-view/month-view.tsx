import React from 'react';
import {DateChangeType} from '../../shared/enums'
import CalendarUtil from '../../shared/util'

import './month-view.scss'
import Month from '../../shared/models/month';

export default function MonthView(props): JSX.Element {
    const width = props.data.width/3 - 8;
    const height = props.data.width/4 - 8;
    const monthData =  CalendarUtil.getMonthsForCalendar();

    if(props.data.isMinDate){
        let minMonth = props.data.minDate.getMonth()
        for(let i = 0; i < minMonth;i++){
            monthData[i].class = 'disable-month'
        }
    }
    else if(props.data.isMaxDate){
        let maxMonth = props.data.maxDate.getMonth()
        for(let i = maxMonth; i < 12;i++){
            monthData[i].class = 'disable'
        }
    }

    const onMonthChange = (month) => {
        props.onDateChange(DateChangeType.month, month)
    }

console.log('Month-View-Rendered')
    return (
            <div className='month-view'>
            {monthData.map((month: Month, index : number) => 
                <div key={index} className={`month-cell ${month.class}`} onClick={() => onMonthChange(month.name)} style={{height:height , width: width}}>                            
                    <div className='month-item'>{month.name}</div>                                    
                </div>
            )}
        </div>          
    )    
}