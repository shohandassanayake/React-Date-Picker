import React from 'react';

import './day.scss'

export default function Day(props): JSX.Element {
    return (       
        <div key={props.cell.index} className={`cell ${props.cell.dayType}`} >
            <div className={`cell-inner ${props.cell.workingStatus}`}>                                    
                
            </div>
            <div style={{position:'absolute'}}><span>{props.cell.day}</span></div>
        </div>                        
    )    
}