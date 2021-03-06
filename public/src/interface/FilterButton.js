import React from 'react';
import {json} from 'd3';

export class FilterButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isSelected: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.filterClicked = this.filterClicked.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    toggleDropdown () {
        this.setState({isSelected: !this.state.isSelected});
    }

    filterClicked (e) {
        e.preventDefault();
        if (e.currentTarget.dataset.value && e.currentTarget.dataset.value !== '') {
            this.props.onClick(this.props.colName, e.currentTarget.dataset.value);
        }
    }

    hideDropdown (e) {
        e.preventDefault();
        if (e.currentTarget === e.target) {
            this.setState({isSelected: false});
        }
    }

    render () {
        const button = <button className={this.props.className + ' filter-button'} onClick={this.toggleDropdown}>
            <span>{this.props.title}</span>
            <span className="filter-button-expand">{ this.state.isSelected ? '-' : '+' }</span>
        </button>;
        const values = this.props.values.map((d, i) => {
            const classNames = this.props.active.includes(d._id) ? 'filter-button-li active' : 'filter-button-li';
            return <li className={classNames} key={i} data-value={d._id} onClick={this.filterClicked}>
                <span>{d._id}</span><span className="filter-count">({d.count})</span>
            </li>;
        });
        return <div>
            {button}
            <div>
                <ul onMouseLeave={this.hideDropdown} style={{height: '300px', overflow: 'scroll', display: this.state.isSelected ? 'unset' : 'none', position: 'absolute', margin: 0, padding: '0px', paddingTop: '40px', top: '10px', background: 'rgba(0,0,0,0)'}}>
                    {values}
                </ul>
            </div>
        </div>;
    }
}
