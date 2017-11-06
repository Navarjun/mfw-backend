import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroup} from './ListGroup';
import {Explorer} from './Explorer';

ReactDOM.render(
    <div>
        <div className='lists'>
            <ListGroup colNames={[
                {name: 'Concerns', key: 'mConcern'},
                {name: 'Strategies', key: 'mStrategy'},
                {name: 'Contains', key: 'mContains'}
            ]}/>
        </div>
        <div className='explorer'>
            <Explorer/>
        </div>
    </div>,
    document.getElementById('root')
);
