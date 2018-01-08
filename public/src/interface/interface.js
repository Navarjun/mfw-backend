import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroup} from './ListGroup';
import {Explorer} from './Explorer';
import {Navbar} from './Navbar';
import { FilterBar } from './FilterBar';
import '../../stylesheets/interface.scss';

let shouldUpdate = false;
class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.updateFilters = this.updateFilters.bind(this);
        this.state = {
            activeFilters: [],
            searchString: undefined
        };
    }

    shouldComponentUpdate () {
        if (shouldUpdate) {
            shouldUpdate = false;
            return true;
        }
        return false;
    }

    updateFilters (activeFilters, searchString) {
        this.setState({
            activeFilters: activeFilters,
            searchString: searchString
        }, () => {
            shouldUpdate = true;
            this.forceUpdate();
        });
    }

    render () {
        return (
            <div>
                <Navbar/>
                <FilterBar filtersUpdated={this.updateFilters}/>
                <Explorer filterData={this.state.activeFilters} searchString={this.state.searchString}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Interface/>,
    document.getElementById('root')
);
