/**
 * DownloadCheckbox.jsx
 * Created by Lizzie Salita 10/31/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default class DownloadCheckbox extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.onChange(name, value);
    }

    render() {
        const name = this.props.name;
        const label = this.props.label;
        return (
            <div className="download-checkbox">
                <input
                    id={name}
                    name={name}
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.handleInputChange} />
                <label htmlFor={name}>{label}</label>
            </div>
        );
    }
}

DownloadCheckbox.propTypes = propTypes;
