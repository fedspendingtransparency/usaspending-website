/**
 * FundingAgency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';

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
