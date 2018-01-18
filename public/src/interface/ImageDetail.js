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

        const children = vars.map((d, i) => {
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

        return (
            <div className="image-detail-container">
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
