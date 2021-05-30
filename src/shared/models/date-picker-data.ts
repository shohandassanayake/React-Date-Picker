import CalendarPicker from "./calendar-data";
import {Picker} from '../enums/enums'

export default interface DatePickerData{
    isLoading : boolean;
    showCalendar : boolean;
    selectedDate : Date;
    picker : Picker;
    format : string;
}