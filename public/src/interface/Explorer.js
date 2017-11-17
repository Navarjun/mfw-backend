import React from 'react';
import {json} from 'd3';
import StackGrid from 'react-stack-grid';

export class Explorer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount () {
        json('/api/v1/images', (err, data) => {
            if (err) {
                console.log(err);
            }
            this.setState({data: data.data});
        });
    }

    componentWillReceiveProps () {
        if (this.props.filterData && this.props.filterData.length > 0) {
            const filterData = this.props.filterData.map(d => {
                var x = {};
                x[d.key] = {$regex: d.values.join('|'), $options: 'i'};
                return {$match: x};
            });
            json('/api/v1/aggregate?query=' + JSON.stringify(filterData), (err, data) => {
                if (err) {
                    console.log(err);
                }
                this.setState({data: data.data});
            });
        }
        // const x = [{'$match': {'mConcern': {'$regex': 'feminism | peace', '$options': 'i'}}}];
    }

    render () {
        // const cols = Math.floor(12 / this.props.colNames.length);
        // const lists = 
        return <div className='explorer'>
            {
                this.state.data.map((d, i) => {
                    return <div key={i}>
                        <img className='explorer-image' src={getImageUrl(d.filename)}/>
                    </div>;
                })
            }
        </div>;
    }
}

function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename;
}
