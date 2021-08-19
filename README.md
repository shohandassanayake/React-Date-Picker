# AquaUI React Date Picker

A simple react date picker.

### Installation
The package can be installed via npm:

```
npm i aqua-ui-react-date-picker
```

### Features

- Day picker
- Month picker
- Year picker
- Calendar Min/Max
- Start day of week (sun = 0, 1, 2, 3, 4, 5, 6)

## Date Picker Props

- picker : set the intital calendar picker type. Default set to day picker('month', 'year')
- width : set width
- setDate : set initial Date
- onChange : returns the date selected
- startDayOfWeek : set start day of week. Default value is '0'
- minDate : set minimum Date of the calendar
- maxDate : set maximum Date of the calendar


##Example

```
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'aqua-ui-react-date-picker'

export default function Example() {
  return (
    <DatePicker
        width={400}
        setDate={new Date()}
        minDate={new Date('2018-02-05')}
        maxDate={new Date('2021-10-25')}
        picker={'month'}
      />
  )
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

```