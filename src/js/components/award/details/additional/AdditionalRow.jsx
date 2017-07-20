/**
 * AdditionalRow.jsx
 * Created by Kevin Li 3/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default class AdditionalRow extends React.Component {
    render() {
        return (
            <div className="additional-row">
                <div className="row-title">
                    {this.props.title}
                </div>
                <div className="row-value">
                    {this.props.value}
                </div>
            </div>
        );
    }
}

AdditionalRow.propTypes = propTypes;
