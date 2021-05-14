import React from 'react';

import './day.scss'

export default function Day(props): JSX.Element {
    const onDayClick = () =>{
        props.cell.date.setDate(props.cell.day);
        props.setDate(props.cell.date)
    }
    return (       
        <div key={props.cell.index} className={`cell ${props.cell.dayType}`} onClick={onDayClick}>
            <div className={`cell-inner ${props.cell.workingStatus}`}>                                    
                
            </div>
            <div style={{position:'absolute'}}><span>{props.cell.day}</span></div>
        </div>                        
    )    
}