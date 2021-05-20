import React, { useState, useRef, useEffect } from 'react';

import './date-picker.scss'
import Calendar from './calendar/calendar'

import CalendarIcon from '../../assets/images/calendar.svg'
import CalendarUtil from '../../shared/util'

import DateFnsUtils from '@date-io/date-fns';


import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { width } from '@material-ui/system';

export default function DatePicker1(): JSX.Element {
    console.log('My-Calendar-Rendered')

    const [pickedDate, setPickedDate] = useState<Date>(null)
        
    const [showCalendar, setShowCaledar] = useState<Boolean>(false);

    const width = 300;

    const inputRef = useRef(null)

    const setDate = (date) => {
        setPickedDate(date);
    }

    const setName = () => {
        return pickedDate == null ? 'Select Date' : CalendarUtil.formatDate(pickedDate, 'MM-dd-yyyy')
    }

    const loadCalendar = () => {

    }

    const dpId = Math.random().toFixed(5);

    const hideCalendar = () => {       
        setShowCaledar(false);        
    }

    const setCalendarPosition = () =>{  
        
        var topOffset = inputRef.current.offsetTop + inputRef.current.clientHeight + 5;
        var leftOffset = inputRef.current.offsetLeft;   
        var w = width * 1.16;
        
        if(window.innerHeight < (inputRef.current.offsetTop + w - window.scrollY + 35)){
            topOffset = inputRef.current.offsetTop - w + 25;
        }

        return {top : topOffset, left: leftOffset}
        
    }

    return (
        <div className='out'>                         
            <div className="date-picker" ref={inputRef} onClick={() => setShowCaledar(true)}>   
                <input className='dp-input' value={setName()} readOnly={true}  /> 
                <span className='dp-img'>
                    <CalendarIcon className='img'></CalendarIcon>
                </span>
            </div>
            {showCalendar ? 
            <div>
                <div className='calendar-popover' onClick={hideCalendar}> </div>
                <div className="date-picker-calendar" style={setCalendarPosition()}>    
                    <Calendar             
                        setDate={setDate}                        
                        width={width}
                    ></Calendar>
                </div>
            </div>
            :
            void 0
            }
        </div>
        
    )
}


