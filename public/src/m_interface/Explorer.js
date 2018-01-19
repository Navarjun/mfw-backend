import React from 'react';
import { json } from 'd3';

export class Explorer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            page: 1,
            perPage: 20,
            imageDetail: undefined
        };

        this.scroll = this.scroll.bind(this);
        this.imageDetail = this.imageDetail.bind(this);
    }

    componentWillMount () {
        json('/api/v1/images', (err, data) => {
            if (err) {
                console.log(err);
            }
            this.setState({data: data.data, loading: false});
        });
    }

    scroll (e) {
        const ele = document.getElementById('explorer-div');
        if (ele.scrollHeight - ele.clientHeight - 500 < ele.scrollTop + ele.clientHeight &&
            this.state.page < parseFloat(this.state.data.length) / this.state.perPage
        ) {
            this.setState({page: this.state.page + 1});
        }
    }

    imageDetail (e) {
        e.preventDefault();
        const imageId = e.target.dataset.name;
        this.props.history.push({ pathname: '/' + imageId, search: this.props.location.search });
    }

    render () {
        const child = this.state.loading
            ? <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-4.gif" style={{width: '100px'}}/>
            </div>
            : [];
        if (!this.state.loading) {
            const div1 = [];
            const div2 = [];
            const chunk = this.state.data.slice(0, this.state.page * this.state.perPage);
            for (var i = 0; i < chunk.length; i++) {
                const image = chunk[i];
                const element = <div key={i}>
                    <img className='explorer-image' data-name={image.filename} src={getImageUrl(image.filename)} onClick={this.imageDetail}/>
                </div>;
                if (i % 2 === 0) {
                    div1.push(element);
                } else {
                    div2.push(element);
                }
            }
            child.push(<div className="col-6" key={1}>{div1}</div>);
            child.push(<div className="col-6" key={2}>{div2}</div>);
        }
        return (
            <div className="row" id="explorer-div" onScroll={this.scroll}>
                {child}
            </div>
        );
    }
}

function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename.replace('.JPG', '.jpg');
}
