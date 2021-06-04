import React from 'react';
import {DateChangeType} from '../../shared/enums/enums'

import './year-view.scss'
import Year from '../../shared/models/year';

export default function YearView(props): JSX.Element {
    const width = props.data.width/3 - 8;
    const height = props.data.width/4 - 8;
    let yearData = props.data.yearData;
    let minYear = yearData[0].year;
    let maxYear = yearData[11].year;
    let currentMinYear = props.data.minDate.getFullYear();
    let currentMaxYear = props.data.maxDate.getFullYear();

    if(minYear <= currentMinYear && currentMinYear <= maxYear ||
         minYear <= currentMaxYear && currentMaxYear <= maxYear){
        for(let i = 0; i < 12;i++){
            if(yearData[i].year < currentMinYear){
                yearData[i].class = 'disable-year'
            }

            if(yearData[i].year > currentMaxYear){
                yearData[i].class = 'disable-year'
            }
        }
    }
    
    const onYearChange = (year) => {    
        props.onDateChange(DateChangeType.year, year) 
    }

    console.log('Year-View-Rendered')
    return (
            <div className='year-view'>
                {yearData.map((year: Year, index : number) => 
                    <div key={index} className={`year-cell ${year.class}`} onClick={()=> onYearChange(year.name)} style={{height: height, width: width}}>                            
                        <div className='year-item'>{year.name}</div>                                    
                    </div>
                )}
        </div>          
    )    
}