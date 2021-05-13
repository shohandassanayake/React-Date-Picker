import React from 'react';

import './legend.scss'
import '../day/day.scss'

export default function Legend(props): JSX.Element {
    return (       
        <div className='legend-container'>
            <div className='item'>                                    
                <div className='circle working'></div>
                <div>Working</div>
            </div>
            <div className='item'>                                    
                <div className='circle absence'></div>
                <div>Absence</div>
            </div>
            <div className='item'>                                    
                <div className='circle holiday'></div>
                <div>Holiday</div>
            </div>
        </div>                        
    )    
}