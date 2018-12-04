import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {json} from 'd3';
import {Navbar} from './Navbar';
import {Explorer} from './Explorer';
import {Filter} from './Filter';
import {ImageDetail} from './ImageDetail';
import '../../stylesheets/m_interface.scss';

class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            totalImages: 0,
            activeFilters: []
        };

        this.filter = this.filter.bind(this);
        this.updateFilters = this.updateFilters.bind(this);
        this.getFilteredImages = this.getFilteredImages.bind(this);
    }

    componentWillMount () {
        json('/api/v1/images?pageSize=6000', (err, data) => {
            if (err) {
                console.log(err);
            }
            this.setState({data: data.data, totalImages: data.data.length});
            this.updateFilters(this.state.activeFilters, this.state.searchString);
        });
    }

    updateFilters (activeFilters, searchString) {
        this.getFilteredCounts('mConcern', activeFilters, searchString, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const mConcernCount = data;
            this.getFilteredCounts('mStrategy', activeFilters, searchString, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const mStrategyCount = data;
                this.getFilteredCounts('mContains', activeFilters, searchString, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const mContainsCount = data;
                    this.setState({
                        activeFilters: activeFilters,
                        searchString: searchString,
                        mConcernCount: mConcernCount,
                        mStrategyCount: mStrategyCount,
                        mContainsCount: mContainsCount,
                        loading: false
                    }, () => {
                        this.getFilteredImages(activeFilters);
                    });
                });
            });
        });
    }

    getFilteredCounts (colName, activeFilters, searchString, callback) {
        const filterData = [];
        for (var i = 0; i < activeFilters.length; i++) {
            let d = activeFilters[i];
            for (var j = 0; j < d.values.length; j++) {
                let obj = {};
                obj[d.key] = {$regex: d.values[j], $options: 'i'};
                filterData.push({$match: obj});
            }
        }
        let query = filterData.concat([
            {$unwind: '$' + colName},
            {$group: {
                _id: '$' + colName,
                count: {$sum: 1}
            }},
            { $sort: {count: -1} }
        ]);
        query = '/api/v1/aggregate?query=' + JSON.stringify(query);
        json(query, (err, data) => {
            if (err) {
                console.log(err);
            }
            callback(null, data.data);
        });
    }

    getFilteredImages (activeFilters) {
        this.setState({loading: true});
        if (activeFilters && activeFilters.length > 0) {
            const filterData = [];
            for (var i = 0; i < activeFilters.length; i++) {
                let d = activeFilters[i];
                for (var j = 0; j < d.values.length; j++) {
                    let obj = {};
                    obj[d.key] = {$regex: d.values[j], $options: 'i'};
                    filterData.push({$match: obj});
                }
            }
            json('/api/v1/aggregate?query=' + JSON.stringify(filterData), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({data: data.data, totalImages: data.data.length, loading: false});
            });
        } else if (!activeFilters || activeFilters.length === 0) {
            json('/api/v1/images?pageSize=6000', (err, data) => {
                if (err) {
                    console.log(err);
                }
                this.setState({data: data.data, totalImages: data.data.length, loading: false});
            });
        }
    }

    filter (colName, value) {
        console.log(colName, value);
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
        if (paramFilter.values.length === 0) {
            activeFilters.splice(activeFilters.indexOf(paramFilter), 1);
        }
        // this.setState({activeFilters: activeFilters, searchString: undefined});
        this.updateFilters(activeFilters, undefined);
    }

    render () {
        return (
            <Router basename="/archiveInterface">
                <div className="container-fluid">
                    <Navbar/>
                    <Filter resultsCount={this.state.totalImages} mConcern={this.state.mConcernCount} mStrategy={this.state.mStrategyCount} mContains={this.state.mContainsCount} updateFilter={this.filter} filterClicked={this.filter} activeFilters={this.state.activeFilters}/>
                    <Route path="/" render={(props) => <Explorer data={this.state.data} loading={this.state.loading} {...props}/>}/>
                    <Route exact path='/:imageId' render={(props) => <ImageDetail {...props}/>}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <Interface/>,
    document.getElementById('root')
);
