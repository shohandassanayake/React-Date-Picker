import React from 'react';

import './headers.scss'

export default function DayHeaders(props): JSX.Element {
    return (
        <div className='day-header-row'>
            {props.headers.map((name: string, index :number) => 
                <div key={index} className='day-header'>
                    <div>{name}</div>
                </div>                    
            )}
        </div>
    )    
}