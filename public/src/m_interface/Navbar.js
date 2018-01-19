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
                        <Link to="/" onClick={() => this.menu(false)}>Browse</Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to="/" onClick={() => this.menu(false)}>Visualization</Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to="/about" onClick={() => this.menu(false)}>About</Link>
                    </div>
                </div>
            </div>;
        }
        return (
            <div className="row" style={{padding: '16px'}}>
                {menu}
                <Link to="/" className="nav-title">The Art of March</Link>
                <button className="menu-button" onClick={() => this.menu(true)}>&equiv;</button>
            </div>
        );
    }
}
