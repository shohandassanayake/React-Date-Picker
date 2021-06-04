import React, { useState, useRef, useEffect } from 'react';

import './date-picker.scss'
import Calendar from './calendar/calendar'

import CalendarIcon from '../../assets/images/calendar.svg'
import CalendarUtil from '../../shared/utils/calendar-util'
import DateUtil from '../../shared/utils/date-util'

import DateFnsUtils from '@date-io/date-fns';


//import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { width } from '@material-ui/system';
import { NONAME } from 'dns';

import DatePickerData from '../../shared/models/date-picker-data'
import { Picker } from '../../shared/enums/enums';



export default function DatePicker(props): JSX.Element {
    console.log('My-Calendar-Rendered')

    const width = props.width;
    let pickerType = props.picker ? Picker[props.picker as keyof typeof Picker] : Picker.day;
    const [datePicker, setDatePicker] = useState<DatePickerData>({
        isLoading : false,
        showCalendar: false,
        selectedDate: props.setDate,
        picker: pickerType,
        format : props.format ? props.format: getDefaultFormat(pickerType)
    })
        
    const [showCalendar, setShowCaledar] = useState<Boolean>(false);

    const inputRef = useRef(null);

    // useEffect(() => { 
    //     setSelectedDate(selectedDate)
    //   },[props.selectedDate])  

    const [calendarPosition, setCalendarPosition] = useState({
        topPos : 0,
        leftPos: 0
    })

    useEffect(() => {
        console.log('My-Calendar-Use-Efect-Rendered')
        setCalendarPosition({
            topPos : inputRef.current.offsetTop + inputRef.current.clientHeight + 5,
            leftPos : inputRef.current.offsetLeft
        })   
        
        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    },[])

    function getDefaultFormat(picker) {
        switch(picker){
            case Picker.day : 
            default: {
                return 'MM-dd-yyyy'
            }
            case Picker.month : {
                return 'yyyy-MM'
            }
            case Picker.year : {
                return 'yyyy'
            }
            case Picker.week : {
                return ''
            }
        }
    }

    function debounce(fn, ms) {
        let timer
        return _ => {
          clearTimeout(timer)
          timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
    }

    const debouncedHandleResize = debounce(function handleResize() {
        setCalendarPosition({
            topPos : inputRef.current.offsetTop + inputRef.current.clientHeight + 5,
            leftPos : inputRef.current.offsetLeft
        })  
    }, 50)

    
    const onDateChange = (date, isReload) => {
        if(isReload){
            if(props.onDateChange){
            props.onChange(date)}
            hideCalendar();
        }
        setDatePicker((data) => ({
            ...data,
            selectedDate : date
        }));
    }

    const setName = () => {
        return datePicker.selectedDate == null ? 'Select Date' : DateUtil.formatDate(datePicker.selectedDate, datePicker.format)
    }

    const hideCalendar = () => {       
        setShowCaledar(false);        
    }

    const getCalendarPosition = () =>{  
        console.log("awa");
        var topOffset = calendarPosition.topPos; 
        var w = width * 1.16;
        
        if(window.innerHeight < (inputRef.current.offsetTop + w - window.scrollY)){
            topOffset = window.innerHeight - inputRef.current.offsetTop + 5;
            return {top : 'unset', bottom:topOffset}
        }
        return {top : topOffset, bottom:'unset'}
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
                <div className="date-picker-calendar" style={getCalendarPosition()}>    
                    <Calendar     
                        //setDate={setDate}  
                        picker={datePicker.picker}
                        date={datePicker.selectedDate} 
                        onDateChange={onDateChange}              
                        width={width}                        
                        minDate={props.minDate}
                        maxDate={props.maxDate}
                    ></Calendar>
                </div>
            </div>
            :
            void 0
            }
        </div>
        
    )
}


