/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import additionalDetails from 'dataMapping/awardsv2/additionalDetails';

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
        const data = additionalDetails(this.props.overview);
        // Do not display the Place of Performance section for IDVs
        let placeOfPerformance = null;
        // Use different Period of Performance and Additional Details mappings for IDVs
        let periodOfPerformance = (
            <Accordion
                globalToggle={this.state.globalToggle}
                accordionName="Period Of Performance"
                accordionIcon="calendar-alt"
                accordionData={data.idvPeriodOfPerformance} />
        );
        let additionalDetailsSection = (
            <Accordion
                globalToggle={this.state.globalToggle}
                accordionName="Additional Details"
                accordionIcon="ellipsis-h"
                accordionData={data.idvAdditionalDetails} />
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
            additionalDetailsSection = (
                <Accordion
                    globalToggle={this.state.globalToggle}
                    accordionName="Additional Details"
                    accordionIcon="ellipsis-h"
                    accordionData={data.additionalDetails} />
            );
        }
        return (
            <div id="award-additional-information" className="additional-info">
                <div className="award-viz">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <InfoCircle />
                        </div>
                        <h3 className="award-viz__title">Additional Information</h3>
                    </div>
                    <hr />
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
                            <Accordion
                                globalToggle={this.state.globalToggle}
                                accordionName="Executive Compensation"
                                accordionIcon="user-tie"
                                accordionData={awardData.executiveDetails.officers} />
                        </div>
                        <div className="award__col">
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
                            {additionalDetailsSection}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AdditionalInfo.propTypes = propTypes;
