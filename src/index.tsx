import React from 'react';
import ReactDOM from 'react-dom';
import ReactDatePicker from './pages/date-picker/date-picker';
ReactDOM.render(  
 
      <ReactDatePicker
        width={400}
        setDate={new Date()}
        onChange={void 0}
        startDayOfWeek={0}
        minDate={new Date('2018-02-05')}
        maxDate={new Date('2021-10-25')}
        picker={'month'}
      />,
 
  document.getElementById('root'),
);  

//export * from './pages/date-picker/date-picker'