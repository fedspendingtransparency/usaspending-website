/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import additionalDetailsContract from 'dataMapping/award/additionalDetailsContract';
import additionalDetailsFinancialAssistance from 'dataMapping/award/additionalDetailsFinancialAssistance';
import additionalDetailsIdv from 'dataMapping/award/additionalDetailsIdv';
import Accordion from './Accordion';
import IdvPeriodOfPerformance from './IdvPeriodOfPerformance';

const propTypes = {
    overview: PropTypes.object
};

export default class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalToggle: false
        };
    }

    handleClick = () => {
        this.setState({ globalToggle: !this.state.globalToggle });
    };

    data() {
        const { overview } = this.props;
        const category = overview._category;
        if (category === 'idv') return additionalDetailsIdv(overview);
        if (category === 'contract') return additionalDetailsContract(overview);
        if (category === 'definitive contract') return additionalDetailsContract(overview);
        if (category === 'grant') return additionalDetailsFinancialAssistance(overview);
        if (category === 'loans') return additionalDetailsFinancialAssistance(overview);
        if (category === 'direct payment') return additionalDetailsFinancialAssistance(overview);
        if (category === 'insurance') return additionalDetailsFinancialAssistance(overview);
        if (category === 'other') return additionalDetailsFinancialAssistance(overview);
        return {};
    }

    columns() {
        const { overview } = this.props;
        const data = this.data();
        // Do not display the Place of Performance section for IDVs
        let placeOfPerformance = null;
        let cdPOP = null;
        let splitCDPOP = null;

        if (data.placeOfPerformance) {
            cdPOP = data.placeOfPerformance["Congressional District"]?.data.pop().trim();
            splitCDPOP = cdPOP?.split(": ");
            if (splitCDPOP?.length === 2) {
                data.placeOfPerformance["Congressional District"] = splitCDPOP[1];
            }
        }
        const cdRD = data.recipientDetails["Congressional District"]?.data.pop().trim();
        const splitCDRD = cdRD?.split(": ");
        if (splitCDRD?.length === 2) {
            data.recipientDetails["Congressional District"] = splitCDRD[1];
        }
        let periodOfPerformance = (
            <IdvPeriodOfPerformance
                key="IdvPeriodOfPerformance"
                accordionData={data.periodOfPerformance}
                globalToggle={this.state.globalToggle} />
        );
        if (this.props.overview._category !== 'idv') {
            placeOfPerformance = (
                <Accordion
                    key="PlaceOfPerformance"
                    globalToggle={this.state.globalToggle}
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={data.placeOfPerformance} />
            );
            periodOfPerformance = (
                <Accordion
                    key="PeriodOfPerformance"
                    globalToggle={this.state.globalToggle}
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    iconClassName="accordion-icon-calendar-alt"
                    accordionData={data.periodOfPerformance} />
            );
        }
        const columnOne = [
            (<Accordion
                key="UniqueAwardKey"
                globalToggle={this.state.globalToggle}
                accordionName="Unique Award Key"
                accordionIcon="fingerprint"
                accordionData={data.uniqueAwardKey} />),
            (<Accordion
                key="AgencyDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Agency Details"
                accordionIcon="landmark"
                accordionData={data.agencyDetails} />),
            (<Accordion
                key="ParentAwardDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Parent Award Details"
                accordionIcon="sitemap"
                accordionData={data.parentAwardDetails} />),
            (placeOfPerformance),
            (periodOfPerformance),
            (<Accordion
                key="LegislativeMandates"
                globalToggle={this.state.globalToggle}
                accordionName="Legislative Mandates"
                accordionIcon="pencil-alt"
                accordionData={data.legislativeMandates} />)
        ];
        const columnTwo = [
            (<Accordion
                key="RecipientDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Recipient Details"
                accordionIcon="building"
                accordionData={data.recipientDetails} />),
            (<Accordion
                key="AcquisitionDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Acquisition Details"
                accordionIcon="tag"
                accordionData={data.acquisitionDetails} />),
            (<Accordion
                key="CompetitionDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Competition Details"
                accordionIcon="chart-bar"
                accordionData={data.competitionDetails} />),
            (<Accordion
                key="AdditionalDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Additional Details"
                accordionIcon="ellipsis-h"
                accordionData={data.additionalDetails} />),
            (<Accordion
                key="ExecutiveCompensation"
                globalToggle={this.state.globalToggle}
                accordionName="Executive Compensation"
                accordionIcon="user-tie"
                accordionData={overview.executiveDetails.officers} />)
        ];

        return { columnOne, columnTwo };
    }

    faColumns() {
        const { overview } = this.props;
        const data = this.data();

        const cdPOP = data.placeOfPerformance["Congressional District"]?.data.pop().trim();
        const splitCDPOP = cdPOP?.split(": ");
        if (splitCDPOP?.length === 2) {
            data.placeOfPerformance["Congressional District"] = splitCDPOP[1];
        }
        const cdRD = data.recipientDetails["Congressional District"]?.data.pop().trim();
        const splitCDRD = cdRD?.split(": ");
        if (splitCDRD?.length === 2) {
            data.recipientDetails["Congressional District"] = splitCDRD[1];
        }
        const columnOne = [
            (<Accordion
                key="UniqueAwardKey"
                globalToggle={this.state.globalToggle}
                accordionName="Unique Award Key"
                accordionIcon="fingerprint"
                accordionData={data.uniqueAwardKey} />),
            (<Accordion
                key="AgencyDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Agency Details"
                accordionIcon="landmark"
                accordionData={data.agencyDetails} />),
            (<Accordion
                key="PlaceOfPerformance"
                globalToggle={this.state.globalToggle}
                accordionName="Place Of Performance"
                accordionIcon="map-marker-alt"
                accordionData={data.placeOfPerformance} />),
            (<Accordion
                key="PeriodOfPerformance"
                globalToggle={this.state.globalToggle}
                accordionName="Period Of Performance"
                accordionIcon="calendar-alt"
                iconClassName="accordion-icon-calendar-alt"
                accordionData={data.periodOfPerformance} />)
        ];
        const columnTwo = [
            (<Accordion
                key="RecipientDetails"
                globalToggle={this.state.globalToggle}
                accordionName="Recipient Details"
                accordionIcon="building"
                accordionData={data.recipientDetails} />),
            (<Accordion
                key="ExecutiveCompensation"
                globalToggle={this.state.globalToggle}
                accordionName="Executive Compensation"
                accordionIcon="user-tie"
                accordionData={overview.executiveDetails.officers} />)
        ];

        return { columnOne, columnTwo };
    }

    render() {
        const category = this.props.overview._category;
        let firstColumn;
        let secondColumn;
        if (category === 'grant' ||
            category === 'loans' ||
            category === 'direct payment' ||
            category === 'insurance' ||
            category === 'other') {
            const { columnOne, columnTwo } = this.faColumns();
            firstColumn = columnOne;
            secondColumn = columnTwo;
        }
        else {
            const { columnOne, columnTwo } = this.columns();
            firstColumn = columnOne;
            secondColumn = columnTwo;
        }

        return (
            <div id="award-additional-information" className="additional-info">
                <div className="award-viz">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <FontAwesomeIcon size="lg" icon="info" />
                        </div>
                        <h3 className="award-viz__title">Additional Information</h3>
                    </div>
                    <button
                        className="award-viz__button"
                        onClick={this.handleClick}>
                        {this.state.globalToggle ? 'Collapse All' : 'Expand All'}
                    </button>
                    <div className="award__row">
                        <div className="award__col">
                            {firstColumn}
                        </div>
                        <div className="award__col">
                            {secondColumn}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AdditionalInfo.propTypes = propTypes;
