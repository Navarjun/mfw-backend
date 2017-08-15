import React from 'react';

export class TextInput extends React.Component {
    render () {
        const label = this.props.label;
        const name = this.props.name;
        const placeholder = this.props.placeholder;
        return (
            <div className='form-group'>
                <label>{label}</label>
                <input type='text' name={name} className='form-control' placeholder={ placeholder || ''}/>
            </div>
        );
    }
}
