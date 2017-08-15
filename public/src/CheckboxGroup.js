import React from 'react';
import {Checkbox} from './Checkbox';

export class CheckboxGroup extends React.Component {
    render () {
        const label = this.props.label;
        const name = this.props.name;
        let values = this.props.values;

        const options = this.props.options ? this.props.options.map(d => {
            let checked = false;
            if (values && values.includes(d.label.toLowerCase())) {
                checked = true;
                values = values.filter(e => e !== d.label.toLowerCase());
            }
            if (d.label.toLowerCase() === 'other') {
                if (values.length > 0) {
                    checked = true;
                } else {
                    checked = false;
                }
            }
            return <Checkbox value={d.label.toLowerCase()} label={d.label} name={name} textbox={d.textbox} textboxValue={values.join(', ')} checked={checked}/>;
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
