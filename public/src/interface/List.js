import React from 'react';
import {json} from 'd3';

export class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
        this.filterClicked = this.filterClicked.bind(this);
    }

    componentWillMount () {
        const query = [
            {$unwind: '$' + this.props.colKey},
            {$group: {
                _id: '$' + this.props.colKey,
                count: {$sum: 1}
            }},
            { $sort: {count: -1} }
        ];

        json('/api/v1/aggregate?query=' + JSON.stringify(query), (err, data) => {
            if (err) {
                console.log(err);
            }
            this.setState({data: data.data});
        });
    }

    filterClicked (e) {
        e.preventDefault();
        if (e.target.dataset.value && this.props.filterClicked) {
            this.props.filterClicked(e.target.dataset.value);
        }
    }

    render () {
        const selectedValuesSet = new Set(this.props.selectedValues && this.props.selectedValues.values ? this.props.selectedValues.values : []);
        const list = <div>
            {/* <h4>{this.props.name}</h4> */}
            <ul className='list-unstyled list'>
                {this.state.data.map((d, i) => {
                    const selected = selectedValuesSet.has(d._id) ? 'selected-filter-value' : '';
                    return <li key={i} className={selected} onClick={this.filterClicked} data-value={d._id}>
                        <span className='filter-value' data-value={d._id}>{d._id}</span>
                        <span className='number' data-value={d._id}>({d.count})</span>
                    </li>;
                })}
            </ul>
        </div>;
        return list;
    }
}
