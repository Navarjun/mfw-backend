import React from 'react';

export class Checkbox extends React.Component {
    render () {
        const value = this.props.value;
        const label = this.props.label;
        const name = this.props.name;
        return (
            <div className='form-check'>
                <label className='form-check-label'>
                    <input className='form-check-input control-checkbox' type='checkbox' name={name} value={value}/>
                    {label}
                </label>
            </div>
        );
    }
}
