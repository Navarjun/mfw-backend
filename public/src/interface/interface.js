import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroup} from './ListGroup';
import {Explorer} from './Explorer';
import {Navbar} from './Navbar';
import { FilterBar } from './FilterBar';
import '../../stylesheets/interface.scss';

class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.updateFilters = this.updateFilters.bind(this);
        this.shouldUpdate = false;
        this.state = {
            activeFilters: [],
            searchString: undefined,
            count: 5949
        };
    }

    shouldComponentUpdate () {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
            return true;
        }
        return false;
    }

    updateFilters (activeFilters, searchString) {
        this.setState({
            activeFilters: activeFilters,
            searchString: searchString
        }, () => {
            this.shouldUpdate = true;
            this.forceUpdate();
        });
    }

    render () {
        return (
            <div>
                {/* <Navbar/> */}
                <FilterBar filtersUpdated={this.updateFilters} count={this.state.count}/>
                <Explorer filterData={this.state.activeFilters} searchString={this.state.searchString} updateCount={(count) => {
                    this.setState({count: count});
                }}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Interface/>,
    document.getElementById('root')
);
