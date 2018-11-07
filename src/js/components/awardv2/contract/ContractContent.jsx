/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';
import AgencyRecipientContent from './AgencyRecipientContent';
import AdditionalInfo from "./AdditionalInfo";
import AwardAmounts from '../visualizations/amounts/AwardAmounts';
import AwardDescription from "../visualizations/description/AwardDescription";

import AwardRecipient from './AwardRecipient';
import AmountDates from './AmountDates';


const propTypes = {
    selectedAward: PropTypes.object,
    inFlight: PropTypes.bool,
    id: PropTypes.string,
    jumpToSection: PropTypes.func
};

export default class ContractContent extends React.Component {
    render() {
        // TODO: determine glossary term for link
        let idLabel = "";
        if (this.props.selectedAward.category === "contract") {
            idLabel = "PIID"
        } else {
            idLabel = "IDVPIID"
        }
        return (
            <div className="award award-contract">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.selectedAward.typeDescription)}</div>
                    <div className="award__heading-glossary">
                        <a href={`#/award_v2/${this.props.id}/?glossary=contract`}>
                            <Icons.Glossary />
                        </a>
                    </div>
                    <div className="award__heading-id">
                        <span className="award__heading-lable">{idLabel}</span>
                        {this.props.selectedAward.id}
                    </div>
                </div>
                <hr />
                <div className="award__row" id="award-overview">
                    <AwardRecipient jumpToSection={this.props.jumpToSection} selectedAward={this.props.selectedAward} />
                    <AmountDates selectedAward={this.props.selectedAward} />
                </div>

                <div className="agency-recipient">
                    <AgencyRecipientContent
                        award={this.props.selectedAward} />
                </div>

                <div className="award__agencyAdditional" id="award-additional-information">
                    <AdditionalInfo
                        award={this.props.selectedAward} />
                </div>

                <hr className="award__divider" />
                <div className="award__row">
                    <AwardAmounts
                        award={this.props.selectedAward} />
                    <AwardDescription
                        award={this.props.selectedAward} />
                </div>
            </div>
        );
    }
}
ContractContent.propTypes = propTypes;
