import React from 'react';

import './day-view.scss'

import {DayRow, DayCell} from '../../shared/models/calendar-picker-data'
import DayHeaders from './headers/headers';
import Day from './day/day'
import Legend from './legend/legend';

export default function DayView(props): JSX.Element {

    console.log('Day-View-Rendered')
    return (
        <div className='day-view'>           
            <DayHeaders
                headers={props.headers}
            ></DayHeaders>
            <div className='days'>
                {props.dayData.map((row: DayRow, index : number) => 
                    <div key={index} className='rows'>
                        {row.rowData.map((cell: DayCell, indx : number) => 
                            <Day
                                key={indx}
                                cell={cell}
                            ></Day>
                        )}
                    </div>
                )}        
            </div>
            <Legend></Legend>
        </div>
    )    
}