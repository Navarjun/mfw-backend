import React from 'react';
import {RadioButton} from './RadioButton';

export class RadioGroup extends React.Component {
    render () {
        const label = this.props.label;
        const name = this.props.name;
        const value = this.props.value;

        const options = this.props.options ? this.props.options.map(d => {
            let checked = false;
            if ('value' in this.props) {
                if ('value' in d) {
                    if (value === d.value) {
                        checked = true;
                    }
                } else {
                    if (value === d.label.toLowerCase()) {
                        checked = true;
                    }
                }
            }
            return <RadioButton value={('value' in d) ? d.value : d.label.toLowerCase()} label={d.label} name={name} checked={checked}/>;
        }) : '';
        return (
            <div className='form-group'>
                <label>{label}</label>
                <div className='input-group'>
                    {options}
                </div>
            </div>
        );
    }
}
