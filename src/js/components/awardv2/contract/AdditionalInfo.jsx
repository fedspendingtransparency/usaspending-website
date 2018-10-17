/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import Accordion from './Accordion';

const propTypes = {
    award: PropTypes.object
};

export default class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalToggle: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ globalToggle: !this.state.globalToggle });
    }
    render() {
        const data = {
            parentAwardDetails: {
                Parent_Award_ID: this.props.award.parentAward,
                IDV_Type: this.props.award.additionalDetails.idvType,
                IDC_Type: this.props.award.additionalDetails.idcType,
                IDV_Agency_Identifier: this.props.award.additionalDetails.idvAgencyId,
                Multiple_Or_Single_Award_IDV: this.props.award.additionalDetails.multipleIdv
            },
            PlaceOfPerformance: {
                City: this.props.award.placeOfPerformance._city,
                State: this.props.award.placeOfPerformance._state,
                County: this.props.award.placeOfPerformance._county,
                Zip_Code: this.props.award.placeOfPerformance._zip,
                Congressional_District: this.props.award.placeOfPerformance._congressionalDistrict
            },
            PeriodOfPerformance: {
                Start_Date: this.props.award.periodOfPerformance.startDate,
                Current_End_Date: this.props.award.periodOfPerformance.endDate,
                Potential_End_Date: this.props.award.periodOfPerformance.potentendDate
            },
            LesgislativeMandates: {
                'Clinger-Cohen_Act_Compliant': this.props.award.additionalDetails.clingerCohenAct,
                Subject_to_Construction_Wage_Rate_Requirements: this.props.award.additionalDetails.constructionWageRateReq,
                Subject_to_Labor_Standards: this.props.award.additionalDetails.laborStandards,
                'Subject_to_Materials,Supplies, Articles & Equipment': this.props.award.additionalDetails.materialSuppliesArticlesEquip
            },
            AquisitionDetails: {
                'Product Service Code (PSC)': this.props.award.additionalDetails.pscCode,
                NAICS_Code: this.props.award.additionalDetails.naicsCode,
                'DoD Claimant Code': this.props.award.additionalDetails.dodClaimantCode,
                'DOD Aquisition Program': this.props.award.unknownplaceholder,
                Information_Technology_Commercial_Item: this.props.award.unknownplaceholder,
                Category: this.props.award.unknownplaceholder,
                Sea_Transportation: this.props.award.additionalDetails.seaTransport
            },
            CompetitionDetails: {
                Solicitation_ID: this.props.award.additionalDetails.solicitationId,
                Solicitation_Procedures: this.props.award.additionalDetails.solicitationProcedures,
                Number_of_Offers_Received: this.props.award.additionalDetails.numberOffers,
                Extent_Completed: this.props.award.additionalDetails.extentCompeted,
                Not_Completed_Reason: this.props.award.additionalDetails.notCompeted,
                'Set-Aside Type': this.props.award.additionalDetails.setAsideType,
                'Commercial Item Aquisition Procedures': this.props.award.additionalDetails.commercialAcquisitionProcedures,
                'Commercial Item Test Program': this.props.award.additionalDetails.commercialTestProgram,
                'Evaluated Preference': this.props.award.additionalDetails.evaluatedPreference,
                Fed_Biz_Opps: this.props.award.additionalDetails.fedBizOpps,
                'Small Business Competetiveness Demonstration': this.props.award.additionalDetails.smallBusinessCompetitivenessDemo,
                Program: this.props.award.additionalDetails.programAcronym
            },
            AdditionalDetails: {
                'Cost or Pricing Data': this.props.award.additionalDetails.costOrPricingData,
                'Domestic or Foreign Entity': this.props.award.additionalDetails.domesticForeign,
                'Fair Opportunity Limited Sources': this.props.award.additionalDetails.fairOpportunityLimitedSources,
                'Interagency Contracting Authority': this.props.award.additionalDetails.interagencyContactingAuthority,
                'Major Program': this.props.award.additionalDetails.majorProgram,
                'Price Evaluation Adjustment Preference Percent Difference': this.props.award.additionalDetails.priceEvaluationAdjustmentPreference,
                'Program Acronym': this.props.award.additionalDetails.programAcronym,
                'Subcontracting Plan': this.props.award.additionalDetails.subcontractingPlan,
                'Multi Year Contract': this.props.award.additionalDetails.multiYearContract,
                'Purcahse Card as Payment Method': this.props.award.additionalDetails.purchaseCardAsPaymentMethod,
                'Consolidated Contract': this.props.award.additionalDetails.consolidated
            }
        };
        return (
            <div className="additionalInfo-wrapper">
                <div className="award__row">
                    <div className="award__row__fullheading award-viz">
                        <div className="award-viz__heading">
                            <div className="award-viz__icon">
                                <InfoCircle />
                            </div>
                            <h3 className="award-viz__title">Additional Information</h3>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="award__row">
                    <div className="award__col globaltoggler">
                        <button
                            className="award-amounts__content text-button"
                            onClick={this.handleClick}>
                            {this.state.globalToggle ? 'Hide All' : 'Show All'}
                        </button>
                    </div>
                </div>
                <div className="award__row award-amounts accordion">
                    <div className="award__col">
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Parent Award Details"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.parentAwardDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Place Of Performance"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.PlaceOfPerformance} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Period Of Performance"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.PeriodOfPerformance} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Lesgislative Mandates"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.LesgislativeMandates} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Executive Compensation"
                            accordionIcon={<InfoCircle />}
                            accordionData={this.props.award.executiveDetails.officers} />
                    </div>
                    <div className="award__col">
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Aquisition Details"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.AquisitionDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Competition Details"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.CompetitionDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Additional Details"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.AdditionalDetails} />
                    </div>
                </div>
            </div>
        );
    }
}
AdditionalInfo.propTypes = propTypes;
