import React from 'react';
import {Navbar} from './Navbar';
import {Questionnaire} from './Questionnaire';

export class ExplorerLayout extends React.Component {
    constructor (props) {
        super(props);
        this.state = { images: this.props.images };
        this.selectImage = this.selectImage.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }

    selectImage (e) {
        const filename = e.target.dataset.filename;
        if (this.state.selectedImage === filename) {
            this.setState({selectedImage: null});
        } else {
            this.setState({selectedImage: this.props.images.filter(d => d.filename === filename)[0]});
        }
    }

    cancel () {
        this.setState({selectedImage: null});
    }

    loadMore () {
        this.props.loadMore(this.state.images.length, (err, images) => {
            if (err) {
                window.alert('error loading more images');
            }
            if (images.data.length === 0) {
                window.alert('That\'s it!');
            }
            this.setState({ images: this.state.images.concat(images.data) });
        });
    }

    submit (obj) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/v1/image/' + this.state.selectedImage.filename, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('readystatechange', (e) => {
            console.log(e);
            if (xhr.readyState === 4 && xhr.status === 200) {
                const images = this.state.images;
                const image = images.filter(d => d.filename === this.state.selectedImage.filename)[0];
                image.hasManualData = true;
                this.setState({ selectedImage: null });
            }
        }, false);
        xhr.send(JSON.stringify(obj));
    }

    render () {
        const images = (this.state.images || []).map(d => {
            let style = { position: 'absolute' };
            const span = d.hasManualData ? <span style={style}>&#10004;</span> : '';
            return (
                <div>
                    {span}
                    <img onClick={this.selectImage} data-filename={d.filename} src={getImageUrl(d.filename)}/>
                </div>
            );
        });

        const questionnaireDiv = this.state.selectedImage
            ? <div className='sidebar d-sm-block bg-light d-none col-sm-4'>
                <div id='questionnaire-container'>
                    <Questionnaire filename={this.state.selectedImage.filename} data={this.state.selectedImage} onSubmit={this.submit} onCancel={this.cancel}></Questionnaire>
                </div>
            </div> : '';

        const popup = <div className='popup'>
            <img src={this.state.selectedImage ? getImageUrl(this.state.selectedImage.filename) : ''} />
        </div>;

        return (
            <div>
                <Navbar active={ this.props.tagged ? 'tagged' : 'untagged' }></Navbar>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            {this.state.selectedImage ? popup : ''}
                            <div id='images-container'>
                                {images}
                            </div>
                            <div>
                                <button className='btn btn-secondary full-width' onClick={this.loadMore}>Load More</button>
                            </div>
                        </div>
                        {questionnaireDiv}
                    </div>
                </div>
            </div>
        );
    }
}

function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename;
}
