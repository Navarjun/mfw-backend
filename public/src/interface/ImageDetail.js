import React from 'react';
import {json} from 'd3';

export class ImageDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
        if (this.props.filename) {
            json('/api/v1/image/' + this.props.filename, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(data);
                this.setState({data: data});
            });
        }
    }

    render () {
        if (!this.state.data) {
            return null;
        }
        const data = this.state.data;
        return (
            <div id='image-detail'>
                <div className="close-btn">
                    <button type="button" className="close" aria-label="Close" onClick={this.props.close}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="img-det-img-div">
                    <img src={getImageUrl(this.props.filename)}/>
                </div>
                <div id="img-det-det-div">
                    <div>
                        <p>
                            <span className="head">Title: </span><span>{data.mTitle}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="head">Text: </span><span>{data.mText}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="head">Labels: </span><span>{data.labels.map((d, i) => <span className="tab" key={i}>{d}</span>)}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename.replace('.JPG', '.jpg');
}
