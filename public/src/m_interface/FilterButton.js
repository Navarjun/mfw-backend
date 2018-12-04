import React from 'react';

export class FilterButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.filterClicked = this.filterClicked.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.collapse) {
            this.setState({isVisible: false});
        }
    }

    toggleFilter () {
        this.setState({isVisible: !this.state.isVisible});
        this.props.expandDelegate(this.props.colName);
    }

    filterClicked (e) {
        e.preventDefault();
        if (e.currentTarget.dataset.value) {
            this.props.filterClicked(this.props.colName, e.currentTarget.dataset.value);
        }
    }

    render () {
        const filterValues = this.state.isVisible
            ? <div className="filter-values-container">
                {this.props.values.map((d, i) => {
                    return <div key={i} className="filter-value white-text" data-value={d._id} onClick={this.filterClicked}>
                        <span onClick={null}>{d._id}</span>
                        <span onClick={null}>({d.count})</span>
                    </div>;
                })}
            </div>
            : null;
        return <div className="filter-container">
            <div className="filter-button" onClick={this.toggleFilter}>
                <p className="white-text name">{this.props.title}</p>
                <p className="white-text plus-sign">+</p>
            </div>
            {filterValues}
        </div>;
    }
}
