import React from 'react';

import './date-picker.scss'
import Calendar from './calendar/calendar'

export default function DatePicker(): JSX.Element {
    console.log('My-Calendar-Rendered')
    return (
        <div>
            <Calendar></Calendar>            
        </div>
    )
}