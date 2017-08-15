import React from 'react';
import {Checkbox} from './Checkbox';

export class CheckboxGroup extends React.Component {
    render () {
        const label = this.props.label;
        const name = this.props.name;
        const options = this.props.options ? this.props.options.map(d => {
            return <Checkbox value={d.label.toLowerCase()} label={d.label} name={name} textbox={d.textbox}/>;
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
