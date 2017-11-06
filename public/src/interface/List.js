import React from 'react';
import {json} from 'd3';

export class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount () {
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

    render () {
        const list = <div>
            <h4>{this.props.name}</h4>
            <ul className='list-unstyled list'>
                {this.state.data.map((d, i) => {
                    return <li key={i}>
                        <span className='lead'>{d._id}</span><span className='number'>({d.count})</span>
                    </li>;
                })}
            </ul>
        </div>;
        return list;
    }
}
