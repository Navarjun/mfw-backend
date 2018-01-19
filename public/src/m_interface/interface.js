import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Navbar} from './Navbar';
import {Explorer} from './Explorer';
import {Filter} from './Filter';
import {ImageDetail} from './ImageDetail';
import '../../stylesheets/m_interface.scss';

class Interface extends React.Component {
    render () {
        return (
            <Router basename="/interface">
                <div className="container-fluid">
                    <Navbar/>
                    <Filter/>
                    <Route path="/" render={(props) => <Explorer {...props}/>}/>
                    <Route exact path='/:imageId' render={(props) => <ImageDetail {...props}/>}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <Interface/>,
    document.getElementById('root')
);
