/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import AdditionalInfo from './AdditionalInfo';
import AgencyRecipient from '../visualizations/overview/AgencyRecipient';
import AwardDates from '../visualizations/overview/AwardDates';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class ContractContent extends React.Component {
    render() {
        return (
            <div className="award award-contract">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.overview.typeDescription)}</div>
                    <div className="award__heading-lable">{this.props.overview.id ? 'PIID' : ''}</div>
                    <div className="award__heading-id">{this.props.overview.id}</div>
                </div>
                <hr />
                <div className="award__row" id="award-overview">
                    <AgencyRecipient
                        jumpToSection={this.props.jumpToSection}
                        awardingAgency={this.props.overview.awardingAgency}
                        category="contract"
                        recipient={this.props.overview.recipient} />
                    <div className="award__col award-amountdates">
                        <AwardDates
                            overview={this.props.overview} />
                    </div>
                </div>

                <div className="award__agencyAdditional" id="award-additional-information">
                    <AdditionalInfo
                        overview={this.props.overview} />
                </div>
            </div>
        );
    }
}
ContractContent.propTypes = propTypes;
