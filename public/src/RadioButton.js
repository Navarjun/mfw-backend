import React from 'react';

export class RadioButton extends React.Component {
    render () {
        const value = this.props.value;
        const label = this.props.label;
        const name = this.props.name;
        const checked = this.props.checked;
        return (
            <div>
                <label className="form-check-label">
                    { checked
                        ? <input type='radio' name={name} value={value} className='form-check-input' checked/>
                        : <input type='radio' name={name} value={value} className='form-check-input'/>
                    }
                    {label}
                </label>
            </div>
        );
    }
}
