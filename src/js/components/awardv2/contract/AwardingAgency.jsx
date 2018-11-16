/**
 * AwardingAgency.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    award: PropTypes.object
};

export default class AwardingAgency extends React.Component {
    render() {
        const awardData = this.props.award;
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award__row">
                    <div className="award__col data-title">
                        <p>Awarding Sub-Agency</p>
                        <p>Awarding Office</p>
                        <p>Funding Agency</p>
                        <p>Funding Sub-Agency</p>
                        <p>Funding Office</p>
                    </div>
                    <div className="award__col data-values">
                        <p>{awardData.awardingAgency.subtierName} ({awardData.awardingAgency.subtierAbbr})</p>
                        <p>{awardData.awardingAgency.officeName}</p>
                        <p>{awardData.fundingAgency.toptierName} ({awardData.fundingAgency.toptierAbbr})</p>
                        <p>{awardData.fundingAgency.subtierName} ({awardData.fundingAgency.subtierAbbr})</p>
                        <p>{awardData.fundingAgency.officeName}</p>
                    </div>
                </div>
            </div>
        );
    }
}
AwardingAgency.propTypes = propTypes;
