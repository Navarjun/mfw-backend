import React from 'react';
import {json} from 'd3';

export class ImageDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.close = this.close.bind(this);
    }

    componentDidMount () {
        if (this.props.match.params.imageId) {
            json('/api/v1/image/' + this.props.match.params.imageId, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({data: data});
            });
        }
    }

    close (e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    render () {
        const vars = [
            { values: [{ dbName: 'mTitle', name: 'title' },
                { dbName: 'mText', name: 'text' },
                { dbName: 'mShow', name: 'show' },
                { dbName: 'mStrategy', name: 'strategy' },
                { dbName: 'mCulturalContext', name: 'cultural context' },
                { dbName: 'mTone', name: 'tone' },
                { dbName: 'mConcern', name: 'concern' },
                { dbName: 'mLetteringStyle', name: 'lettering style' },
                { dbName: 'mContains', name: 'contains' },
                { dbName: 'mMade', name: 'made' },
                { dbName: 'mCondition', name: 'condition' }] }
            // { values: [{ dbName: 'mNotesArtifact', name: 'notes about artifact' },
            //     { dbName: 'mNotesImageAndText', name: 'notes about image and text' },
            //     { dbName: 'mNotesIntent', name: 'notes about intent' },
            //     { dbName: 'mAdditionalTheme', name: 'additional themes' },
            //     { dbName: 'mAdditionalNotes', name: 'additional notes' },
            //     { dbName: 'mAdditionalKeywords', name: 'additional keywords' }] }
        ];
        const data = this.state.data;
        let children = null;
        if (data) {
            children = vars.map((d, i) => {
                const trs = [];
                for (let i in d.values) {
                    const e = d.values[i];
                    if (Array.isArray(data[e.dbName])) {
                        trs.push(<tr key={i}>
                            <td className="head">{e.name}</td>
                            <td>{
                                data[e.dbName].join(',')
                            }</td>
                        </tr>);
                    } else {
                        trs.push(<tr key={i}>
                            <td className="head">{e.name}</td>
                            <td>{
                                data[e.dbName]
                            }</td>
                        </tr>);
                    }
                }
                const children = <table>
                    <tbody>
                        {trs}
                    </tbody>
                </table>;

                return <div key={i}>
                    {children}
                </div>;
            });
        }

        return (
            <div className="image-detail-container">
                <div className="close-btn">
                    <button type="button" className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="image-detail">
                    <div>
                        <img src={getImageUrl(this.props.match.params.imageId)}/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

function getImageUrl (filename) {
    return 'https://s3.us-east-2.amazonaws.com/artofthemarch/med_res/' + filename.replace('.JPG', '.jpg');
}
