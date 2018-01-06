import React from 'react';
import {Motion, spring} from 'react-motion';
import {Explorer} from './Explorer';
import {List} from './List';
import {FilterButton} from './FilterButton';
import * as _ from 'lodash';
import {json} from 'd3';

export class FilterBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeFilters: [
                // {key: 'mConcern', values: []}
            ],
            mConcernCount: [],
            mStrategyCount: [],
            mContainsCount: []
        };
        this.filterValueClicked = this.filterValueClicked.bind(this);
        this.filterValues = this.filterValues.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.getFilteredCounts = this.getFilteredCounts.bind(this);
        this.updateFilters = this.updateFilters.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillMount () {
        this.updateFilters();
    }

    updateFilters () {
        this.getFilteredCounts('mConcern');
        this.getFilteredCounts('mStrategy');
        this.getFilteredCounts('mContains');
    }

    getFilteredCounts (colName) {
        const query = [
            {$unwind: '$' + colName},
            {$group: {
                _id: '$' + colName,
                count: {$sum: 1}
            }},
            { $sort: {count: -1} }
        ];

        json('/api/v1/aggregate?query=' + JSON.stringify(query), (err, data) => {
            if (err) {
                console.log(err);
            }
            const obj = {};
            obj[colName + 'Count'] = data.data;
            this.setState(obj);
        });
    }

    filterValueClicked (colName, value) {
        if (colName && value) {
            this.filterValues(colName, value);
        }
    }

    filterValues (colName, value) {
        // Maintains list of active filters for the gallery
        const activeFilters = _.cloneDeep(this.state.activeFilters);
        let paramFilter = activeFilters.filter(d => d.key === colName);
        if (paramFilter.length === 0) {
            paramFilter = {key: colName, values: []};
            activeFilters.push(paramFilter);
        } else {
            paramFilter = paramFilter[0];
        }
        const index = paramFilter.values.indexOf(value);
        if (index === -1) {
            paramFilter.values.push(value);
        } else {
            paramFilter.values.splice(index, 1);
        }
        this.setState({activeFilters: activeFilters, searchString: undefined});
        this.updateFilters();
    }

    removeFilter (e) {
        const colName = e.target.dataset.filterKey;
        const value = e.target.dataset.filterValue;
        const activeFilters = _.cloneDeep(this.state.activeFilters);
        let paramFilter = activeFilters.filter(d => d.key === colName);
        if (paramFilter.length === 0) {
            return;
        }
        paramFilter = paramFilter[0];
        paramFilter.values = paramFilter.values.filter(d => d !== value);
        this.setState({activeFilters: activeFilters, searchString: undefined});
        this.updateFilters();
    }

    search (e) {
        if (document.querySelector('#search-field').value && document.querySelector('#search-field').value !== '') {
            this.setState({ activeFilters: [], searchString: document.querySelector('#search-field').value });
        }
    }

    render () {
        const filters = [
            {key: 'mConcern', display: 'Concern'},
            {key: 'mStrategy', display: 'Strategy'},
            {key: 'mContains', display: 'Contains'}
        ];

        const filterButtons = filters.map((filter, i) => {
            // filter active values
            // for particular column
            const activeFilters = this.state.activeFilters.filter(d => d.key === filter.key);
            const active = this.state.activeFilters
                ? (activeFilters.length > 0 ? activeFilters[0].values : []) // if no values return an empty array
                : [];
            let className = '';
            switch (filter.key) {
            case 'mConcern':
                className += 'concern';
                break;
            case 'mStrategy':
                className += 'strategy';
                break;
            case 'mContains':
                className += 'contains';
            }
            return <li key={i}>
                <FilterButton className={className} values={this.state[filter.key + 'Count']} active={active} colName={filter.key} onClick={this.filterValueClicked}>{filter.display}</FilterButton>
            </li>;
        });

        const filterTabs = this.state.activeFilters.map((filter, i) => {
            if (filter.values.length > 0) {
                var classNames = 'btn btn-sm margin-right-sm';
                switch (filter.key) {
                case 'mConcern':
                    classNames += ' btn-concern';
                    break;
                case 'mStrategy':
                    classNames += ' btn-strategy';
                    break;
                case 'mContains':
                    classNames += ' btn-contains';
                }
                return filter.values.map((filterVal) => {
                    return <li>
                        <span className={classNames}>
                            {filterVal}
                            <span className="margin-left-sm clickable hover-glow-light" aria-hidden="true" data-filter-key={filter.key} data-filter-value={filterVal} onClick={this.removeFilter}>&times;</span>
                        </span>
                    </li>;
                });
            }
            return null;
        });

        return (
            <div>
                <div className="navbar navbar-expand-lg navbar-light bg-light" style={{zIndex: 1}}>
                    {/* <a className="navbar-brand" href="#">All</a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li>
                                <a className="nav-link disabled" href="#">Refine By:</a>
                            </li>
                            {filterButtons}
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" id="search-field" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-expand-lg bg-light">
                    <ul className="navbar-nav">
                        {filterTabs}
                    </ul>
                </div>
                {/* {filterList} */}
                <div className='container-fluid' id='explorer'>
                    <div className='row'>
                        <Explorer filterData={this.state.activeFilters} searchString={this.state.searchString}></Explorer>
                    </div>
                </div>
            </div>
        );
    }
}
