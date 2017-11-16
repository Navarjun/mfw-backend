import React from 'react';
import {Motion, spring} from 'react-motion';
import {Explorer} from './Explorer';
import {List} from './List';

export class FilterBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {filterVisible: false};
        this.filterClicked = this.filterClicked.bind(this);
    }

    filterClicked (e) {
        if (this.state.filterVisible && this.state.filterVisible === e.target.dataset.colname) {
            this.setState({filterVisible: false});
            return;
        }
        this.setState({filterVisible: e.target.dataset.colname});
    }

    render () {
        const filterList = this.state.filterVisible
            ? (
                <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1)}}>
                    { interpolationFn => <div style={interpolationFn} className='container-fluid' id='filter-list'>
                        <div className='row bg-light' style={{height: '200px'}}>
                            <List colKey={this.state.filterVisible} name=''></List>
                        </div>
                    </div>}
                </Motion>)
            : null;

        return (
            <div>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    {/* <a className="navbar-brand" href="#">All</a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li>
                                <a className="nav-link disabled" href="#">Refine By:</a>
                            </li>
                            <li>
                                <a className={this.state.filterVisible && this.state.filterVisible === 'mConcern' ? 'nav-link active' : 'nav-link'} href="#" data-colname="mConcern" onClick={this.filterClicked}>Concerns</a>
                            </li>
                            <li>
                                <a className={this.state.filterVisible && this.state.filterVisible === 'mStrategy' ? 'nav-link active' : 'nav-link'} href="#" data-colname="mStrategy" onClick={this.filterClicked}>Strategies</a>
                            </li>
                            <li>
                                <a className={this.state.filterVisible && this.state.filterVisible === 'mContains' ? 'nav-link active' : 'nav-link'} href="#" data-colname="mContains" onClick={this.filterClicked}>Contains</a>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */
                        </div>
                    </div>
                </div>
                {filterList}
                <div className='container-fluid' id='explorer'>
                    <div className='row'>
                        <Explorer></Explorer>
                    </div>
                </div>
            </div>
        );
    }
}
