 import React from 'react';
import BackIcon from '../../assets/images/back.svg';
import NextIcon from '../../assets/images/next.svg';

import './calendar-nav.scss'

import {ViewType, DateChangeType} from '../../shared/enums/enums'
import CalendarUtil from '../../shared/utils/calendar-util'
import DateUtil from '../../shared/utils/date-util'


export default function NavHeader(props): JSX.Element {

    console.log('Toolbar-Header-Rendered')

    let year = props.viewType === ViewType.year ? CalendarUtil.getYearsLabel(props.data.year) :  props.data.year;
    let month = DateUtil.getMonthLongName(props.data.date);
    let nextClass = '';
    let backClass = '';
    
    if(props.data.minDate){
        switch(props.viewType){
            case ViewType.day: {
                if(DateUtil.getStartDayOfMonth(props.data.date) <= props.data.minDate ){
                    backClass = 'disable';
                }
                break;
            }
            case ViewType.month: {
                if(DateUtil.getStartDayOfYear(props.data.date) <= props.data.minDate){
                    backClass = 'disable';
                }
                break;
            }
            case ViewType.year: {
                if(props.data.yearData[0].year <= props.data.minDate.getFullYear()){
                    backClass = 'disable';
                }
                break;
            }
            default:
                break;
        }
    }

    if(props.data.maxDate){
        switch(props.viewType){
            case ViewType.day: {
                if(DateUtil.getEndDayOfMonth(props.data.date) >= props.data.maxDate){
                    nextClass = 'disable';
                }
                break;
            }
            case ViewType.month: {
                if(DateUtil.getEndDayOfYear(props.data.date) >= props.data.maxDate){
                    nextClass = 'disable';
                }
                break;
            }
            case ViewType.year: {
                if(props.data.yearData[11].year >= props.data.maxDate.getFullYear()){
                    nextClass = 'disable';
                }
                break;
            }
            default:
                break;
        }
    }

    const onViewChange = (ViewType) => {
        props.onViewChange(ViewType)
    }

    const onPreviousClick = () => {
        if(props.viewType == ViewType.day){
            props.onDateChange(DateChangeType.prevDay)
        }
        else if(props.viewType == ViewType.month){
            let yr = parseInt(props.year) - 1;
            props.onDateChange(DateChangeType.prevMonth, yr)
        }
        else{            
            let yr = parseInt(props.year) - (parseInt(props.year) % 10) - 2;
            props.onDateChange(DateChangeType.prevYear, yr)
        }
    }    

    const onNextClick = () => {
        if( props.viewType== ViewType.day){
            props.onDateChange(DateChangeType.nextDay)
        }
        else if(props.viewType == ViewType.month){
            let yr = parseInt(props.year) + 1;
            props.onDateChange(DateChangeType.nextMonth, yr)
        }
        else{         
            let yr = parseInt(props.year) - (parseInt(props.year) % 10) + 12;
            props.onDateChange(DateChangeType.nextYear, yr)
        }
    }

    return (
        <div className='calendar-nav'>
           
            <div className='date'>
                <div className={`month ${props.viewType== ViewType.year ? 'month-hide' : ''}`}
                    onClick={() => onViewChange(ViewType.month)}>{month}</div>&nbsp;
                <div className='year' onClick={() => onViewChange(ViewType.year)}>{year}</div>
            </div>
            {/* <div className='year'></div> */}
            <div className={`btn-prev ` + backClass} onClick={onPreviousClick} >
                {/* <FontAwesomeIcon icon="angle-left"></FontAwesomeIcon> */}
                <BackIcon/>  
            </div> 
            <div className={`btn-next ` + nextClass} onClick={onNextClick} >
                <NextIcon></NextIcon>
                {/* <FontAwesomeIcon icon="angle-right"></FontAwesomeIcon> */}
            </div>
        </div>          
    )    
}

