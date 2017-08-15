const React = require('react');
const BaseLayout = require('./BaseLayout');
const Navbar = require('./Navbar');

class ExplorerLayout extends React.Component {
    render () {
        return (
            <div>
                <h1>ERROR</h1>
                {JSON.stringify(this.props.error, null, 2)}
            </div>
        );
    }
}

module.exports = ExplorerLayout;
