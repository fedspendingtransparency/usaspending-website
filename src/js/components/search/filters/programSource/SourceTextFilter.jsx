/**
 * SourceTextFilter.jsx
 * Created by Lizzie Salita 6/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    code: PropTypes.string,
    characterLimit: PropTypes.number,
    updateComponent: PropTypes.func,
    value: PropTypes.string
};

export class SourceTextFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const searchString = e.target.value;
        this.props.updateComponent(this.props.code, searchString);
    }

    render() {
        return (
            <div className="program-source-text-filter">
                <label className="program-source-text-filter__label">
                    {`${this.props.label} (${this.props.code.toUpperCase()})`}
                </label>
                <div className="program-source-text-filter__wrapper">
                    <input
                        type="text"
                        className="program-source-text-filter__input"
                        id={`source-${this.props.code}-filter`}
                        value={this.props.value}
                        maxLength={this.props.characterLimit}
                        onChange={this.onChange}
                        placeholder={`Enter ${this.props.code.toUpperCase()} value (${this.props.characterLimit} characters)`} />
                </div>
            </div>
        );
    }
}

export default SourceTextFilter;
SourceTextFilter.propTypes = propTypes;
