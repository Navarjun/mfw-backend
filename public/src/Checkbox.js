import React from 'react';

export class Checkbox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {checked: false};
        this.toggleTextbox = this.toggleTextbox.bind(this);
    }
    toggleTextbox (e) {
        this.setState({checked: e.target.checked});
    }
    render () {
        const value = this.props.value;
        const label = this.props.label;
        const name = this.props.name;
        const textbox = (this.props.textbox && this.state.checked)
            ? <input type='text' className='form-control check-textbox' name={name + '-textbox'} placeholder='comma-seperated values'></input>
            : null;

        return (
            <div className='form-check'>
                <label className='form-check-label'>
                    <input className='form-check-input control-checkbox' type='checkbox' name={name} onChange={this.toggleTextbox} value={value}/>
                    {label}
                </label>
                {textbox}
            </div>
        );
    }
}
