/**
 * AwardingAgency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';

const defaultProps = {
};

const propTypes = {
};

export default class AwardingAgency extends React.Component {

    render() {
        return (
            <div>
                <label htmlFor="awarding-agency">Awarding Agency</label><br />
                <input type="text" id="awarding-agency" placeholder="Placeholder" />
            </div>
        );
    }
}

AwardingAgency.propTypes = propTypes;
AwardingAgency.defaultProps = defaultProps;
