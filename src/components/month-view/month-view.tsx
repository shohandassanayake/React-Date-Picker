import React from 'react';
import {DateChangeType} from '../../shared/enums'
import CalendarUtil from '../../shared/util'

import './month-view.scss'

export default function MonthView(props): JSX.Element {
    
    const monthData =  CalendarUtil.getMonthsForCalendar();

    const onMonthChange = (month) => {
        props.onDateChange(DateChangeType.month, month)
    }

console.log('Month-View-Rendered')
    return (
            <div className='month-view'>
            {monthData.map((title: string, index : number) => 
                <div key={index} className='month-cell' onClick={() => onMonthChange(index)}>                            
                    <div className='month-item'>{title}</div>                                    
                </div>
            )}
        </div>          
    )    
}