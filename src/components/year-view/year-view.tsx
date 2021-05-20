import React from 'react';
import {DateChangeType} from '../../shared/enums'
import CalendarUtil from '../../shared/util'

import './year-view.scss'

export default function YearView(props): JSX.Element {
    const width = props.width/3 - 8;
    const height = props.width/4 - 8;
    let yearData = CalendarUtil.getYearsForCalendar(props.year);
    
    const onYearChange = (year) => {    
        props.onDateChange(DateChangeType.year, year) 
    }

    console.log('Year-View-Rendered')
    return (
            <div className='year-view'>
                {yearData.map((title: string, index : number) => 
                    <div key={index} className='year-cell' onClick={()=> onYearChange(title)} style={{height: height, width: width}}>                            
                        <div className='year-item'>{title}</div>                                    
                    </div>
                )}
        </div>          
    )    
}