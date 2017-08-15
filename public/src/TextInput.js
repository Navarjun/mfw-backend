import React from 'react';

export class TextInput extends React.Component {
    render () {
        const label = this.props.label;
        const name = this.props.name;
        const placeholder = this.props.placeholder;
        const value = this.props.value ? this.props.value : '';

        return (
            <div className='form-group'>
                <label>{label}</label>
                <input type='text' name={name} value={value} className='form-control' placeholder={ placeholder || ''}/>
            </div>
        );
    }
}
