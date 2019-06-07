/**
 * SourceSelectFilter.jsx
 * Created by Lizzie Salita 6/7/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    code: PropTypes.string,
    characterLimit: PropTypes.number,
    required: PropTypes.bool,
    options: PropTypes.array
};

const defaultProps = {
    options: []
};

export class SourceSelectFilter extends React.Component {
    render() {
        return (
            <div className="source-select-filter">
                <label htmlFor={this.props.code}>{`${this.props.label} (${this.props.code.toUpperCase()})`}</label>
                <input
                    id={this.props.code}
                    type="text"
                    maxLength={this.props.characterLimit}
                    placeholder={`Enter ${this.props.code.toUpperCase()} value (${this.props.characterLimit} characters)`} />
            </div>
        );
    }
}

export default SourceSelectFilter;
SourceSelectFilter.propTypes = propTypes;
SourceSelectFilter.defaultProps = defaultProps;
