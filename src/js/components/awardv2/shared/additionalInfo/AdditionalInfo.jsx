/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import additionalDetailsContract from 'dataMapping/awardsv2/additionalDetailsContract';
// import additionalDetailsFinancialAssistance from 'dataMapping/awardsv2/additionalDetailsFinancialAssistance';
import additionalDetailsIdv from 'dataMapping/awardsv2/additionalDetailsIdv';

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
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ globalToggle: !this.state.globalToggle });
    }

    data() {
        const { overview } = this.props;
        const category = overview._category;
        if (category === 'idv') return additionalDetailsIdv(overview);
        if (category === 'contract') return additionalDetailsContract(overview);
        if (category === 'definitive contract') return additionalDetailsContract(overview);;
        if (category === 'grant') return null;
        if (category === 'loan') return null;
        if (category === 'direct payment') return null;
        if (category === 'other') return null;
        return {};
    }
    render() {
        const { overview } = this.props;
        const data = this.data();
        // Do not display the Place of Performance section for IDVs
        let placeOfPerformance = null;
        let periodOfPerformance = (
            <IdvPeriodOfPerformance
                accordionData={data.periodOfPerformance}
                globalToggle={this.state.globalToggle} />
        );
        if (this.props.overview._category !== 'idv') {
            placeOfPerformance = (
                <Accordion
                    globalToggle={this.state.globalToggle}
                    accordionName="Place Of Performance"
                    accordionIcon="map-marker-alt"
                    accordionData={data.placeOfPerformance} />
            );
            periodOfPerformance = (
                <Accordion
                    globalToggle={this.state.globalToggle}
                    accordionName="Period Of Performance"
                    accordionIcon="calendar-alt"
                    accordionData={data.periodOfPerformance} />
            );
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
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Agency Details"
                                accordionIcon="landmark"
                                accordionData={data.agencyDetails} />
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Parent Award Details"
                                accordionIcon="level-up-alt"
                                accordionData={data.parentAwardDetails} />
                            {placeOfPerformance}
                            {periodOfPerformance}
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Legislative Mandates"
                                accordionIcon="pencil-alt"
                                accordionData={data.legislativeMandates} />
                        </div>
                        <div className="award__col">
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Recipient Details"
                                accordionIcon="building"
                                accordionData={data.recipientDetails} />
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Acquisition Details"
                                accordionIcon="tag"
                                accordionData={data.aquisitionDetails} />
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Competition Details"
                                accordionIcon="chart-bar"
                                accordionData={data.competitionDetails} />
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Additional Details"
                                accordionIcon="ellipsis-h"
                                accordionData={data.additionalDetails} />
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Executive Compensation"
                                accordionIcon="user-tie"
                                accordionData={overview.executiveDetails.officers} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AdditionalInfo.propTypes = propTypes;
