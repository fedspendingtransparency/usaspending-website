/**
 * AgencyHeader.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';

const propTypes = {
    account: React.PropTypes.object
};

export default class AgencyHeader extends React.Component {
    render() {
        return (
            <div className="page-title-bar">
                <div className="page-title-bar-wrap">
                    <h1 className="page-title">
                        Agency Summary
                    </h1>
                </div>
            </div>
        );
    }
}

AgencyHeader.propTypes = propTypes;
