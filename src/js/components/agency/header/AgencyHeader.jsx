/**
 * AgencyHeader.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    account: PropTypes.object
};

export default class AgencyHeader extends React.Component {
    render() {
        return (
            <div className="page-title-bar">
                <div className="page-title-bar-wrap">
                    <h1 className="page-title">
                        Agency Profile
                    </h1>
                </div>
            </div>
        );
    }
}

AgencyHeader.propTypes = propTypes;
