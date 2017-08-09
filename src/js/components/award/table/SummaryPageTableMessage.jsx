/**
 * SummaryPageTableMessage.jsx
 * Created by Kevin Li 3/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

export default class SummaryPageTableMessage extends React.Component {
    render() {
        return (
            <div className="table-message">
                {this.props.message}
            </div>
        );
    }
}

SummaryPageTableMessage.propTypes = propTypes;
