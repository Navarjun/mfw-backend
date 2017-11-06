import React from 'react';
import {json} from 'd3';

import {List} from './List';

export class ListGroup extends React.Component {
    render () {
        const cols = Math.floor(12 / this.props.colNames.length);
        const lists = this.props.colNames.map(d => {
            return <div className={`col-sm-${cols}`} key={d.name}>
                <List colKey={d.key} name={d.name}></List>
            </div>;
        });
        return <div className='row list-group-module'>
            {lists}
        </div>;
    }
}
