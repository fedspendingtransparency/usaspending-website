/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from "lodash";

import AwardRecipient from '../visualizations/overview/AgencyRecipient';
import AwardDates from '../visualizations/overview/AwardDates';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class FinancialAssistanceContent extends React.Component {
    render() {
        // TODO: Determine if we should label with FAIN/ URI instead of ID
        return (
            <div className="award award-financial-assistance">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.overview.typeDescription)}</div>
                    <div className="award__heading-lable">{this.props.overview.id ? 'ID' : ''}</div>
                    <div className="award__heading-id">{this.props.overview.id}</div>
                </div>
                <hr className="award__divider" />
                <div className="award__row award-overview" id="award-overview">
                    <AwardRecipient
                        jumpToSection={this.props.jumpToSection}
                        awardingAgency={this.props.overview.awardingAgency}
                        category={this.props.overview.category}
                        recipient={this.props.overview.recipient} />
                    <div className="award__col award-amountdates">
                        <AwardDates
                            overview={this.props.overview} />
                    </div>
                </div>
            </div>
        );
    }
}
FinancialAssistanceContent.propTypes = propTypes;
