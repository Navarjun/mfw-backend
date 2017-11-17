import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroup} from './ListGroup';
import {Explorer} from './Explorer';
import {Navbar} from './Navbar';
import { FilterBar } from './FilterBar';

ReactDOM.render(
    <div>
        <Navbar/>
        <FilterBar/>
    </div>,
    document.getElementById('root')
);
