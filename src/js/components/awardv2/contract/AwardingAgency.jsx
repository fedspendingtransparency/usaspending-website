/**
 * AwardingAgency.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Agency } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class AwardingAgency extends React.Component {
    render() {
        console.log(this.props.award, 'for awarding agency');
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <Agency />
                    </div>
                    <h3 className="award-viz__title">
                        Awarding Agency
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <h3>{this.props.award.awardingAgency.toptierName} {this.props.award.awardingAgency.toptierAbbr}</h3>
                </div>
                <div className="award__row">
                    <div className="award__col">
                        <p><strong>Awarding Sub-Agency</strong></p>
                        <p><strong>Awarding Office</strong></p>
                        <p><strong>Funding Agency</strong></p>
                        <p><strong>Funding Sub-Agency</strong></p>
                        <p><strong>Funding Office</strong></p>
                    </div>
                    <div className="award__col">
                        <p>{this.props.award.awardingAgency.subtierName} ({this.props.award.awardingAgency.subtierAbbr})</p>
                        <p>{this.props.award.awardingAgency.officeName}</p>
                        <p>{this.props.award.fundingAgency.toptierName} ({this.props.award.fundingAgency.toptierAbbr})</p>
                        <p>{this.props.award.fundingAgency.subtierName} ({this.props.award.fundingAgency.subtierAbbr})</p>
                        <p>{this.props.award.fundingAgency.officeName}</p>
                    </div>
                </div>
            </div>
        );
    }
}
AwardingAgency.propTypes = propTypes;
