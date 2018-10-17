/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle, Calendar } from 'components/sharedComponents/icons/Icons';

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
        const awardData = this.props.award;
        const data = {
            parentAwardDetails: {
                'Parent Award ID': awardData.parentAward,
                'IDV Type': awardData.additionalDetails.idvType,
                'IDC Type': awardData.additionalDetails.idcType,
                'IDV Agency Identifier': awardData.additionalDetails.idvAgencyId,
                'Multiple Or Single Award IDV': awardData.additionalDetails.multipleIdv
            },
            PlaceOfPerformance: {
                City: awardData.placeOfPerformance._city,
                State: awardData.placeOfPerformance._state,
                County: awardData.placeOfPerformance._county,
                'Zip Code': awardData.placeOfPerformance._zip,
                'Congressional District': awardData.placeOfPerformance._congressionalDistrict
            },
            PeriodOfPerformance: {
                'Start Date': awardData.periodOfPerformance.startDate,
                'Current End Date': awardData.periodOfPerformance.endDate,
                'Potential End Date': awardData.periodOfPerformance.potentendDate
            },
            LegislativeMandates: {
                'Clinger-Cohen Act Compliant': awardData.additionalDetails.clingerCohenAct,
                'Subject to Construction Wage Rate Requirements': awardData.additionalDetails.constructionWageRateReq,
                'Subject to Labor Standards': awardData.additionalDetails.laborStandards,
                'Subject to Materials,Supplies, Articles & Equipment': awardData.additionalDetails.materialSuppliesArticlesEquip
            },
            AquisitionDetails: {
                'Product Service Code (PSC)': awardData.additionalDetails.pscCode,
                'NAICS Code': awardData.additionalDetails.naicsCode,
                'DoD Claimant Code': awardData.additionalDetails.dodClaimantCode,
                'DOD Aquisition Program': awardData.unknownplaceholder,
                'Information Technology Commercial Item': awardData.unknownplaceholder,
                Category: awardData.unknownplaceholder,
                'Sea Transportation': awardData.additionalDetails.seaTransport
            },
            CompetitionDetails: {
                'Solicitation ID': awardData.additionalDetails.solicitationId,
                'Solicitation Procedures': awardData.additionalDetails.solicitationProcedures,
                'Number of Offers Received': awardData.additionalDetails.numberOffers,
                'Extent Completed': awardData.additionalDetails.extentCompeted,
                'Not Completed Reason': awardData.additionalDetails.notCompeted,
                'Set-Aside Type': awardData.additionalDetails.setAsideType,
                'Commercial Item Aquisition Procedures': awardData.additionalDetails.commercialAcquisitionProcedures,
                'Commercial Item Test Program': awardData.additionalDetails.commercialTestProgram,
                'Evaluated Preference': awardData.additionalDetails.evaluatedPreference,
                'Fed Biz Opps': awardData.additionalDetails.fedBizOpps,
                'Small Business Competetiveness Demonstration': awardData.additionalDetails.smallBusinessCompetitivenessDemo,
                Program: awardData.additionalDetails.programAcronym
            },
            AdditionalDetails: {
                'Cost or Pricing Data': awardData.additionalDetails.costOrPricingData,
                'Domestic or Foreign Entity': awardData.additionalDetails.domesticForeign,
                'Fair Opportunity Limited Sources': awardData.additionalDetails.fairOpportunityLimitedSources,
                'Interagency Contracting Authority': awardData.additionalDetails.interagencyContactingAuthority,
                'Major Program': awardData.additionalDetails.majorProgram,
                'Price Evaluation Adjustment Preference Percent Difference': awardData.additionalDetails.priceEvaluationAdjustmentPreference,
                'Program Acronym': awardData.additionalDetails.programAcronym,
                'Subcontracting Plan': awardData.additionalDetails.subcontractingPlan,
                'Multi Year Contract': awardData.additionalDetails.multiYearContract,
                'Purchase Card as Payment Method': awardData.additionalDetails.purchaseCardAsPaymentMethod,
                'Consolidated Contract': awardData.additionalDetails.consolidated
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
                            className="award-amounts__content text-button-container__button"
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
                            accordionIcon={<Calendar />}
                            accordionData={data.PeriodOfPerformance} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Lesgislative Mandates"
                            accordionIcon={<InfoCircle />}
                            accordionData={data.LegislativeMandates} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Executive Compensation"
                            accordionIcon={<InfoCircle />}
                            accordionData={awardData.executiveDetails.officers} />
                    </div>
                    <div className="award__col">
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Aquisition Details"
                            accordionIcon={<img src="img/state-categories/naics.png" alt="Aquisition Details" />}
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
