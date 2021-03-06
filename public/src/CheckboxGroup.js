import React from 'react';
import {Checkbox} from './Checkbox';

export class CheckboxGroup extends React.Component {
    render () {
        const label = this.props.label;
        const name = this.props.name;
        let values = this.props.values ? this.props.values.map(d => d.toLowerCase()) : [];

        const options = this.props.options ? this.props.options.map(d => {
            let checked = false;
            if (values && values.includes(d.value ? d.value.toLowerCase() : d.label.toLowerCase())) {
                const matchedValue = d.value ? d.value.toLowerCase() : d.label.toLowerCase()
                checked = true;
                values = values.filter(e => e !== matchedValue);
            }
            if (!checked && d.label.toLowerCase() === 'other') {
                if (values && values.length > 0) {
                    checked = true;
                } else {
                    checked = false;
                }
            }
            let value = d.value || d.label.toLowerCase();
            return <Checkbox value={value} label={d.label} name={name} textbox={d.textbox} textboxValue={values ? values.join(',') : ''} checked={checked}/>;
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
