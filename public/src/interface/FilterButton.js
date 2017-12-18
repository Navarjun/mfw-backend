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
    }

    toggleDropdown () {
        this.setState({isSelected: !this.state.isSelected});
    }

    filterClicked (e) {
        e.preventDefault();
        if (e.currentTarget.dataset.value && e.currentTarget.dataset.value !== '') {
            console.log(e.currentTarget.dataset.value);
            this.props.onClick(this.props.colName, e.currentTarget.dataset.value);
        }
    }

    render () {
        console.log(this.props.active);
        const button = <button className='filter-button' style={{width: '150px'}} onClick={this.toggleDropdown}>{this.props.children}</button>;
        const values = this.props.values.map((d, i) => {
            const classNames = this.props.active.includes(d._id) ? 'filter-button-li active' : 'filter-button-li';
            return <li className={classNames} key={i} data-value={d._id} onClick={this.filterClicked}>
                <span>{d._id}</span><span>{d.count}</span>
            </li>;
        });
        return <div>
            {button}
            <div>
                <ul style={{height: '300px', overflow: 'scroll', display: this.state.isSelected ? 'unset' : 'none', position: 'absolute', margin: 0, padding: 0}}>
                    {values}
                </ul>
            </div>
        </div>;
    }
}
