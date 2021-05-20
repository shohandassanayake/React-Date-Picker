import React from 'react';
import {DateChangeType} from '../../shared/enums'
import CalendarUtil from '../../shared/util'

import './month-view.scss'

export default function MonthView(props): JSX.Element {
    const width = props.width/3 - 8;
    const height = props.width/4 - 8;
    const monthData =  CalendarUtil.getMonthsForCalendar();

    const onMonthChange = (month) => {
        props.onDateChange(DateChangeType.month, month)
    }

console.log('Month-View-Rendered')
    return (
            <div className='month-view'>
            {monthData.map((title: string, index : number) => 
                <div key={index} className='month-cell' onClick={() => onMonthChange(index)} style={{height:height , width: width}}>                            
                    <div className='month-item'>{title}</div>                                    
                </div>
            )}
        </div>          
    )    
}