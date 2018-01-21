import React from 'react';
import { Link } from 'react-router-dom';
import { FilterButton } from './FilterButton';

export class Filter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isFilterVisible: false,
            expandedFilter: false
        };

        this.toggleFilters = this.toggleFilters.bind(this);
        this.filterClicked = this.filterClicked.bind(this);
        this.FilterButtonExpanded = this.FilterButtonExpanded.bind(this);
    }

    filterClicked (colName, value) {
        this.props.filterClicked(colName, value);
    }

    toggleFilters (isVisible) {
        this.setState({ isFilterVisible: isVisible });
    }

    render () {
        let filterView = null;
        if (this.state.isFilterVisible) {
            filterView = <div className="menu">
                <div>
                    <div className="">
                        <button type="button" className="close" aria-label="Close" onClick={() => this.toggleFilters(false)}>
                            <span aria-hidden="true" style={{color: 'white'}}>&times;</span>
                        </button>
                    </div>
                </div>
                <div className="active-filters">
                    {this.props.activeFilters
                        ? this.props.activeFilters.map((d, i) => {
                            return d.values.map((e, j) => {
                                return <span key={d + ' ' + j} onClick={() => this.filterClicked(d.key, e)}>{e}</span>;
                            });
                        })
                        : null}
                </div>
                <div className="no-vertical-padding">
                    <FilterButton colName="mConcern" title="Concern" collapse={this.state.expandedFilter !== 'mConcern'} values={this.props.mConcern} filter={this.filter} expandDelegate={this.FilterButtonExpanded} filterClicked={this.filterClicked}/>
                </div>
                <div className="no-vertical-padding">
                    <FilterButton colName="mStrategy" title="Strategy" collapse={this.state.expandedFilter !== 'mStrategy'} values={this.props.mStrategy} filter={this.filter} expandDelegate={this.FilterButtonExpanded} filterClicked={this.filterClicked}/>
                </div>
                <div className="no-vertical-padding">
                    <FilterButton colName="mContains" title="Contains" collapse={this.state.expandedFilter !== 'mContains'} values={this.props.mContains} filter={this.filter} expandDelegate={this.FilterButtonExpanded} filterClicked={this.filterClicked}/>
                </div>
            </div>;
        }
        return (
            <div className="row filter">
                {filterView}
                <span className="result-count">{this.props.resultsCount + ' Results'}</span>
                <div className="filter-buttons">
                    <span onClick={ () => this.toggleFilters(true) }> REFINE </span>
                    {/* <span> SEARCH </span> */}
                </div>
            </div>
        );
    }

    // FILTER BUTTON DELEGATE
    FilterButtonExpanded (colName) {
        this.setState({expandedFilter: colName});
    }
}
