/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle, Calendar, Agency } from 'components/sharedComponents/icons/Icons';

import Accordion from './Accordion';

const propTypes = {
    overview: PropTypes.object
};

export default class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalToggle: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ globalToggle: !this.state.globalToggle });
    }
    render() {
        const awardData = this.props.overview;
        const periodOfPerformanceData = awardData.periodOfPerformance || awardData.dates;
        const parentAwardDetails = awardData.parentAwardDetails;
        const data = {
            agencyDetails: {
                'Awarding Department': awardData.awardingAgency.formattedToptier,
                'Awarding Agency': awardData.awardingAgency.subtierName,
                'Awarding Office': awardData.awardingAgency.officeName,
                'Contracting Department': awardData.fundingAgency.formattedToptier,
                'Contracting Agency': awardData.fundingAgency.subtierName,
                'Contracting Office': awardData.fundingAgency.officeName
            },
            parentAwardDetails: {
                'Parent Award ID': parentAwardDetails ? parentAwardDetails.awardId : '',
                'IDV Type': parentAwardDetails ? parentAwardDetails.idvType : '',
                'IDC Type': parentAwardDetails ? parentAwardDetails.idcType : '',
                'IDV Agency Identifier': parentAwardDetails ? parentAwardDetails.agencyId : '',
                'Multiple Or Single Award IDV': parentAwardDetails ? parentAwardDetails.multipleOrSingle : ''
            },
            PlaceOfPerformance: {
                City: awardData.placeOfPerformance._city,
                State: awardData.placeOfPerformance._state,
                County: awardData.placeOfPerformance._county,
                'Zip Code': awardData.placeOfPerformance._zip,
                'Congressional District': awardData.placeOfPerformance._congressionalDistrict
            },
            PeriodOfPerformance: {
                'Start Date': periodOfPerformanceData.startDate,
                'Current End Date': periodOfPerformanceData.endDate,
                'Potential End Date': periodOfPerformanceData.potentialEndDate
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
                Category: awardData.itCommercialCategory,
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
                'IDV Type': awardData.additionalDetails.idvType,
                'IDC Type': awardData.additionalDetails.idcType,
                'IDV Agency Identifier': awardData.additionalDetails.idvAgencyId,
                'Multiple Or Single Award IDV': awardData.additionalDetails.multipleIdv,
                'Cost or Pricing Data': awardData.additionalDetails.costOrPricingData,
                'Domestic or Foreign Entity': awardData.additionalDetails.domesticForeign,
                'Fair Opportunity Limited Sources': awardData.additionalDetails.fairOpportunityLimitedSources,
                'Foreign Funding': awardData.additionalDetails.foreignFunding,
                'Interagency Contracting Authority': awardData.additionalDetails.interagencyContactingAuthority,
                'Major Program': awardData.additionalDetails.majorProgram,
                'Price Evaluation Adjustment Preference Percent Difference': awardData.additionalDetails.priceEvaluationAdjustmentPreference,
                'Program Acronym': awardData.additionalDetails.programAcronym,
                'Subcontracting Plan': awardData.additionalDetails.subcontractingPlan,
                'Multi Year Contract': awardData.additionalDetails.multiYearContract,
                'Purchase Card as Payment Method': awardData.additionalDetails.purchaseCardAsPaymentMethod,
                'Consolidated Contract': awardData.additionalDetails.consolidated,
                'Total Obligation': awardData.additionalDetails.total_obligation,
                'Base Exercised Options': awardData.additionalDetails.base_exercised_options,
                'Base and All Options Value': awardData.additionalDetails.base_and_all_options_value
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
                            {this.state.globalToggle ? 'Collapse All' : 'Expand All'}
                        </button>
                    </div>
                </div>
                <div className="award__row award-amounts accordion">
                    <div className="award__col">
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Agency Details"
                            accordionIcon={<Agency />}
                            accordionData={data.agencyDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Parent Award Details"
                            accordionIcon={<img src="img/award-summary/parent-award-details.png" alt="Parent Award Details" />}
                            accordionData={data.parentAwardDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Place Of Performance"
                            accordionIcon={<img src="img/award-summary/place-of-performance.png" alt="Place Of Performance" />}
                            accordionData={data.PlaceOfPerformance} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Period Of Performance"
                            accordionIcon={<Calendar />}
                            accordionData={data.PeriodOfPerformance} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Legislative Mandates"
                            accordionIcon={<img src="img/award-summary/legislative-mandates.png" alt="Lesgislative Mandates" />}
                            accordionData={data.LegislativeMandates} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Executive Compensation"
                            accordionIcon={<img src="img/award-summary/executive-compensation.png" alt="Executive Compensation" />}
                            accordionData={awardData.executiveDetails.officers} />
                    </div>
                    <div className="award__col">
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Acquisition Details"
                            accordionIcon={<img src="img/state-categories/naics.png" alt="Aquisition Details" />}
                            accordionData={data.AquisitionDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Competition Details"
                            accordionIcon={<img src="img/award-summary/competition-details.png" alt="Competition Details" />}
                            accordionData={data.CompetitionDetails} />
                        <Accordion
                            globalToggle={this.state.globalToggle}
                            accordionName="Additional Details"
                            accordionIcon={<img src="img/award-summary/additional-details.png" alt="Additional Details" />}
                            accordionData={data.AdditionalDetails} />
                    </div>
                </div>
            </div>
        );
    }
}
AdditionalInfo.propTypes = propTypes;
