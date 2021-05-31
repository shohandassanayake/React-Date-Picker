import React from 'react';

import './day-view.scss'

import {DayRow, DayCell} from '../../shared/models/calendar-data'
import DayHeaders from './headers/headers';
import Day from './day/day'
import Legend from './legend/legend';

export default function DayView(props): JSX.Element {

    console.log('Day-View-Rendered')

    const width = props.data.width/7;
    return (
        <div className='day-view'>           
            <DayHeaders
                headers={props.data.headers}
            ></DayHeaders>
            <div className='days'>
                {props.data.dayData.map((row: DayRow, index : number) => 
                    <div key={index} className='rows'>
                        {row.rowData.map((cell: DayCell, indx : number) => 
                            <Day
                                key={cell.index}
                                cell={cell}
                                onDateChange={props.onDateChange}
                                height={width}
                            ></Day>
                        )}
                    </div>
                )}        
            </div>
            {/* <Legend></Legend> */}
        </div>
    )    
}