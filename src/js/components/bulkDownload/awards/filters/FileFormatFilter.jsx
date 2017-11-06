/**
 * FileFormatFilter.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    fileFormats: PropTypes.array,
    currentFileFormat: PropTypes.string,
    updateParam: PropTypes.func,
    valid: PropTypes.bool
};

export default class FileFormatFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const target = e.target;
        this.props.updateParam('file_format', target.value);
    }

    render() {
        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationTriangle />
                </div>
            );
        }

        const fileFormats = this.props.fileFormats.map((fileFormat) => (
            <div
                className="radio"
                key={fileFormat.name}>
                <input
                    type="radio"
                    value={fileFormat.name}
                    name="fileFormat"
                    checked={this.props.currentFileFormat === fileFormat.name}
                    onChange={this.onChange}
                    disabled={fileFormat.disabled} />
                <label
                    className={`radio-label ${fileFormat.disabled ? 'disabled' : ''}`}
                    htmlFor="fileFormat">
                    {fileFormat.label}
                </label>
            </div>
        ));

        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select a <span>file format</span>.
                </h5>
                <div className="filter-section-content">
                    {fileFormats}
                </div>
            </div>
        );
    }
}

FileFormatFilter.propTypes = propTypes;
