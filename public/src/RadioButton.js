import React from 'react';

export class RadioButton extends React.Component {
    constructor (props) {
        super(props);
        // this.state = { checked: !!this.props.checked };
    }
    render () {
        const value = this.props.value;
        const label = this.props.label;
        const name = this.props.name;
        const checked = this.props.checked;
        return (
            <div>
                <label className="form-check-label">
                    <input type='radio' name={name} value={value} className='form-check-input' defaultChecked={!!checked}/>
                    {label}
                </label>
            </div>
        );
    }
}
