import React from 'react';
import {json} from 'd3';
import StackGrid from 'react-stack-grid';
import {ImageDetail} from './ImageDetail';

export class Explorer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            page: 3,
            perPage: 10,
            imageDetail: undefined,
            shouldUpdateCount: false
        };
        this.allImages = [];
        this.totalImagesInDb = 5949;
        this.scroll = this.scroll.bind(this);
        this.wheel = this.wheel.bind(this);
        this.imageDetail = this.imageDetail.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidUpdate () {
        if (this.state.shouldUpdateCount) {
            this.setState({shouldUpdateCount: false});
            this.props.updateCount(this.state.total);
        }
    }

    loadMore (pageNumber = 0) {
        if (this.allImages.length >= this.totalImagesInDb) {
            return;
        }
        json('/api/v1/images?pageSize=100&pageNumber=' + pageNumber, (err, data) => {
            if (err) {
                console.log(err);
            }
            this.allImages = this.allImages.concat(data.data);
            if (!this.props.searchString && this.props.filterData.length <= 0) {
                this.setState({data: this.allImages}, () => {
                    this.loadMore(pageNumber + 1);
                });
            } else {
                this.loadMore(pageNumber + 1);
            }
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.searchString && nextProps.searchString !== '') {
            this.setState({loading: true});
            json('/api/v1/search?query=' + nextProps.searchString, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({data: data.data, total: data.data.length, page: 3, pageSize: 100, totalPages: Math.ceil(data.data.length / this.state.perPage), shouldUpdateCount: true, loading: false});
            });
        } else if (nextProps.filterData && nextProps.filterData.length > 0) {
            this.setState({loading: true});
            const filterData = [];
            for (var i = 0; i < nextProps.filterData.length; i++) {
                let d = nextProps.filterData[i];
                for (var j = 0; j < d.values.length; j++) {
                    let obj = {};
                    obj[d.key] = {$regex: d.values[j], $options: 'i'};
                    filterData.push({$match: obj});
                }
            }
            // const x = [{'$match': {'mConcern': {'$regex': 'peace', '$options': 'i'}}}];
            json('/api/v1/aggregate?query=' + JSON.stringify(filterData), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({data: data.data, total: data.data.length, page: 3, pageSize: 100, totalPages: Math.ceil(data.data.length / this.state.perPage), shouldUpdateCount: true, loading: false});
            });
        } else {
            if (this.allImages.length >= this.totalImagesInDb) {
                this.setState({data: this.allImages, total: this.totalImagesInDb, page: 3, pageSize: 100, totalPages: Math.ceil(this.allImages.length / this.state.perPage), shouldUpdateCount: true, loading: false});
                return;
            }
            this.allImages = [];

            json('/api/v1/images', (err, data) => {
                if (err) {
                    console.log(err);
                }
                this.allImages = data.data;
                this.totalImagesInDb = data.total;
                this.setState({data: data.data, total: data.total, page: 3, pageSize: 100, totalPages: Math.ceil(data.data.length / this.state.perPage), shouldUpdateCount: true, loading: false}, () => {
                    this.loadMore(1);
                });
            });
        }
    }

    wheel (e) {
        if (this.state.imageDetail) {
            return;
        }
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) {
            // if user is scrolling right/left
            return;
        }
        e.preventDefault();
        const ele = document.getElementById('explorer-div');

        if ((e.deltaY > 0 && ele.scrollLeft + e.deltaY < ele.scrollWidth) ||
            (e.deltaY < 0 && ele.scrollLeft + e.deltaY > 0)
        ) {
            ele.scrollLeft += e.deltaY;
        } else if (e.deltaY < 0 && ele.scrollLeft + e.deltaY <= 0) {
            // margin of error
            // if scrolling to the left very fast but already close to edge
            // deltaY will lead to 'scrollLeft + deltaY' < 0
            // so just take it to zero
            ele.scrollLeft = 0;
        } else if (e.deltaY > 0 && ele.scrollLeft + e.deltaY >= ele.scrollWidth) {
            ele.scrollLeft = ele.scrollWidth;
        }
    }

    scroll (e) {
        const ele = document.getElementById('explorer-div');
        if (ele.scrollWidth - 500 < ele.scrollLeft + ele.clientWidth &&
            (this.state.page <= parseFloat(this.state.data.length) / this.state.perPage)
        ) {
            this.setState({page: this.state.page + 1});
        }
    }

    imageDetail (e) {
        e.preventDefault();
        this.setState({imageDetail: e.target.dataset.name});
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
                    <img className='explorer-image clickable' data-name={d.filename} src={getImageUrl(d.filename)} onClick={this.imageDetail} onWheel={null} onScroll={null}/>
                </div>;
            });
        const overlay = this.state.imageDetail
            ? <ImageDetail filename={this.state.imageDetail} close={() => this.setState({imageDetail: null})}/>
            : null;

        return <div style={{position: 'relative'}} onWheel={this.wheel} onScroll={this.scroll}>
            {overlay}
            <div className='explorer' id='explorer-div'>
                {child}
            </div>
        </div>;
    }
}

function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename.replace('.JPG', '.jpg');
}
