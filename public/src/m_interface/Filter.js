import React from 'react';
import { Link } from 'react-router-dom';

export class Filter extends React.Component {
    render () {
        return (
            <div className="row filter">
                <span className="result-count">532 Results</span>
                <div className="filter-buttons">
                    <span> REFINE </span>
                    <span> SEARCH </span>
                </div>
            </div>
        );
    }
}
