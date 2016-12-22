/**
 * FundingAgency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';

const defaultProps = {
};

const propTypes = {
};

export default class FundingAgency extends React.Component {

    render() {
        return (
            <div>
                <label htmlFor="funding-agency">Funding Agency</label><br />
                <input type="text" id="funding-agency" placeholder="Placeholder" />
            </div>
        );
    }
}

FundingAgency.propTypes = propTypes;
FundingAgency.defaultProps = defaultProps;
