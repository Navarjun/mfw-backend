import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isMenuVisible: false
        };

        this.menu = this.menu.bind(this);
    }

    menu (visible) {
        this.setState({isMenuVisible: visible});
    }

    render () {
        let menu = null;
        if (this.state.isMenuVisible) {
            menu = <div className="menu">
                <div>
                    <div className="">
                        <button type="button" className="close" aria-label="Close" onClick={() => this.menu(false)}>
                            <span aria-hidden="true" style={{color: 'white'}}>&times;</span>
                        </button>
                    </div>
                </div>

                <div>
                    <div>
                        <Link to="/" onClick={() => this.menu(false)}>Collection</Link>
                    </div>
                </div>
                <div>
                    <div>
                        <a href="/visualization.html">Visualization</a>
                    </div>
                </div>
                <div>
                    <div>
                        <a href="/about.html">About</a>
                    </div>
                </div>
                <div>
                    <div>
                        <a href="/team.html">Team</a>
                    </div>
                </div>
                <div>
                    <div>
                        <a href="/press.html">Press</a>
                    </div>
                </div>
            </div>;
        }
        return (
            <div className="row" style={{padding: '16px'}}>
                {menu}
                <Link to="/" className="nav-title">Art of the March</Link>
                <button className="menu-button" onClick={() => this.menu(true)}>&equiv;</button>
            </div>
        );
    }
}
