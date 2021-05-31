import React from 'react';

import './day.scss'
import {DateChangeType} from '../../../shared/enums/enums'

export default function Day(props): JSX.Element {
    const onDayClick = () =>{
        props.cell.date.setDate(props.cell.day);
        props.onDateChange(DateChangeType.day, props.cell.date)
    }

    const dayStatusStyle= () => {
        return props.cell.dayStatus == 'working-absence-holiday' ? {borderWidth : (props.height/2)* 0.80} : void 0;
    }
    return (       
        <div key={props.cell.index} className={`cell ${props.cell.dayType}`} onClick={onDayClick} style={{height: props.height, width: props.height}}>
            <div className={`cell-inner-1 ${props.cell.dayStatus}`} style={dayStatusStyle()}>
                <div className={`cell-inner-2`}>
                    <div  className='cell-inner-text'><span>{props.cell.day}</span></div>
                </div>
            </div>
        </div>                        
    )    
}