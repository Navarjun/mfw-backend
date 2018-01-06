import React from 'react';
import {json} from 'd3';
import StackGrid from 'react-stack-grid';

export class Explorer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            page: 2,
            perPage: 10
        };
        this.scroll = this.scroll.bind(this);
    }

    componentWillMount () {
        json('/api/v1/images', (err, data) => {
            if (err) {
                console.log(err);
            }
            this.setState({data: data.data, loading: false});
        });
    }

    componentWillReceiveProps () {
        if (this.props.searchString && this.props.searchString !== '') {
            this.setState({loading: true});
            json('/api/v1/search?query=' + this.props.searchString, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({data: data.data, loading: false});
            });
        } else if (this.props.filterData && this.props.filterData.length > 0) {
            this.setState({loading: true});
            const filterData = this.props.filterData.map(d => {
                var x = {};
                x[d.key] = {$regex: d.values.join('|'), $options: 'i'};
                return {$match: x};
            });
            json('/api/v1/aggregate?query=' + JSON.stringify(filterData), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({data: data.data, loading: false});
            });
        }
        // const x = [{'$match': {'mConcern': {'$regex': 'feminism | peace', '$options': 'i'}}}];
    }

    scroll (e) {
        e.preventDefault();
        const ele = document.getElementById('explorer-div');

        if ((e.deltaY > 0 && ele.scrollLeft + e.deltaY < ele.scrollWidth) ||
            (e.deltaY < 0 && ele.scrollLeft + e.deltaY > 0)
        ) {
            ele.scrollLeft += e.deltaY;
        }

        if (ele.scrollWidth - 500 < ele.scrollLeft + ele.clientWidth &&
            this.state.page < parseFloat(this.state.data.length) / this.state.perPage
        ) {
            this.setState({page: this.state.page + 1});
        }
    }

    render () {
        // const cols = Math.floor(12 / this.props.colNames.length);
        // const lists = 
        const child = this.state.loading
            ? <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-4.gif" style={{width: '100px'}}/>
            </div>
            : this.state.data.slice(0, this.state.page * this.state.perPage).map((d, i) => {
                return <div key={i}>
                    <img className='explorer-image' src={getImageUrl(d.filename)} onWheel={null}/>
                </div>;
            });
        return <div className='explorer' id='explorer-div' onWheel={this.scroll}>
            {
                child
            }
        </div>;
    }
}

function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename.replace('.JPG', '.jpg');
}
