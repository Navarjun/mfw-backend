import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    render () {
        return (
            <div className="row">
                <Link to="/" className="nav-title">The Art of March</Link>
                <button className="menu-button">&equiv;</button>
            </div>
        );
    }
}
