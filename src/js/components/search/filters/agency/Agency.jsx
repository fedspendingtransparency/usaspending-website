/**
 * Agency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import AwardingAgency from './AwardingAgency';
import FundingAgency from './FundingAgency';

const defaultProps = {
};

const propTypes = {
};

export default class Agency extends React.Component {

    render() {
        return (
            <div className="agency-filter search-filter">
                <AwardingAgency />
                <FundingAgency />
            </div>
        );
    }
}

Agency.propTypes = propTypes;
Agency.defaultProps = defaultProps;
