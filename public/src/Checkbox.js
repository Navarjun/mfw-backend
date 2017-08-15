import React from 'react';

export class Checkbox extends React.Component {
    constructor (props) {
        super(props);
        // if this.props.textboxValue is NOT blank
        // then show the textbox
        this.state = {checked: (this.props.textboxValue !== '')};
        this.toggleTextbox = this.toggleTextbox.bind(this);
    }
    toggleTextbox (e) {
        this.setState({checked: e.target.checked});
    }
    render () {
        const value = this.props.value;
        const label = this.props.label;
        const name = this.props.name;
        const textboxValue = this.props.textboxValue;
        const checked = this.props.checked;

        const textbox = (this.props.textbox && this.state.checked)
            ? <input type='text' className='form-control check-textbox' value={textboxValue} name={name + '-textbox'} placeholder='comma-seperated values'></input>
            : null;

        return (
            <div className='form-check'>
                <label className='form-check-label'>
                    { checked
                        ? <input className='form-check-input control-checkbox' type='checkbox' name={name} onChange={this.toggleTextbox} value={value} checked/>
                        : <input className='form-check-input control-checkbox' type='checkbox' name={name} onChange={this.toggleTextbox} value={value}/>
                    }

                    {label}
                </label>
                {textbox}
            </div>
        );
    }
}
