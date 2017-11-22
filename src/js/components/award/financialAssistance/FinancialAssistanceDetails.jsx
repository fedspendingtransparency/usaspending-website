/**
 * FinancialAssistanceDetails.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { capitalize } from 'lodash';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';
import DetailRow from '../DetailRow';

const propTypes = {
    selectedAward: PropTypes.object,
    seeAdditional: PropTypes.func
};

const isEmpty = (field, ignoreDefault) => {
    if (!field) {
        return true;
    }
    if (field === '') {
        return true;
    }
    if (!ignoreDefault && field === ignoreDefault) {
        return true;
    }
    return false;
};

export default class FinancialAssistanceDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: "",
            date: "",
            place: "",
            typeDesc: "",
            programName: "",
            programDesc: "",
            cfdaOverflow: false
        };
    }

    componentWillReceiveProps() {
        this.prepareValues(this.props.selectedAward);
    }

    parsePlaceOfPerformance(award) {
        // Location
        let popPlace = '';

        let cityState = null;
        const city = award.pop_city;
        const stateProvince = award.pop_state_province;

        if (!isEmpty(city) && !isEmpty(stateProvince)) {
            cityState = `${city}, ${stateProvince}`;
        }
        else if (!isEmpty(city)) {
            cityState = city;
        }
        else if (!isEmpty(stateProvince)) {
            cityState = stateProvince;
        }
        if (award.pop_country_code === 'USA') {
            if (!isEmpty(cityState)) {
                popPlace = cityState;
            }
            if (!isEmpty(award.pop_zip)) {
                if (popPlace !== '') {
                    popPlace += ' ';
                }
                popPlace += award.pop_zip;
            }

            if (!isEmpty(award.pop_state_code) && !isEmpty(award.pop_congressional_district)) {
                if (popPlace !== '') {
                    popPlace += '\n';
                }
                popPlace +=
            `Congressional District: ${award.pop_state_code}-${award.pop_congressional_district}`;
            }
        }
        else if (award.pop_country_code !== 'USA') {
            popPlace = `${award.pop_country}`;
        }

        if (popPlace === '') {
            popPlace = 'Not available';
        }

        return popPlace;
    }

    prepareValues() {
        let yearRangeTotal = "";
        let description = null;
        const award = this.props.selectedAward;
        const latestTransaction = award.latest_transaction;

        // Date Range
        const startDate = moment(award.period_of_performance_start_date, 'M/D/YYYY');
        const endDate = moment(award.period_of_performance_current_end_date, 'M/D/YYYY');
        const yearRange = endDate.diff(startDate, 'year');
        let popDate = "Not Available";
        if (!isNaN(yearRange) && yearRange !== 0) {
            if (yearRange === 1) {
                yearRangeTotal = `${yearRange} year)`;
            }
            else {
                yearRangeTotal = `(${yearRange} years)`;
            }

            popDate = `${award.period_of_performance_start_date} -
               ${award.period_of_performance_current_end_date} ${yearRangeTotal}`;
        }

        if (award.description) {
            description = award.description;
        }
        else {
            description = "Not Available";
        }
        let awardType = '';
        if (award.award_type) {
            awardType = capitalize(SummaryPageHelper.awardType(award.award_type));
        }

        // CFDA Data
        let programName = 'Not Available';
        let programDescription = 'Not Available';

        if (latestTransaction.assistance_data) {
            const assistanceData = latestTransaction.assistance_data;

            if (assistanceData.cfda_number && assistanceData.cfda_title) {
                programName = `${assistanceData.cfda_number} - ${assistanceData.cfda_title}`;
            }
            else if (assistanceData.cfda_number) {
                programName = assistanceData.cfda_title;
            }
            else if (assistanceData.program_title) {
                programName = assistanceData.cfda_title;
            }

            if (assistanceData.cfda_objectives) {
                programDescription = assistanceData.cfda_objectives;
            }
        }

        let cfdaOverflow = false;
        if (programDescription.length > SummaryPageHelper.maxDescriptionCharacters) {
            cfdaOverflow = true;
        }

        this.setState({
            description,
            programName,
            cfdaOverflow,
            date: popDate,
            place: this.parsePlaceOfPerformance(award),
            typeDesc: award.type_description,
            awardType,
            programDesc: programDescription
        });
    }

    render() {
        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h3>Award Details</h3>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                    <table>
                        <tbody>
                            <DetailRow
                                title="Description"
                                value={this.state.description} />
                            <DetailRow
                                title="Period of Performance"
                                value={this.state.date} />
                            <DetailRow
                                title="Primary Place of Performance"
                                value={this.state.place} />
                            <DetailRow
                                title={`${this.state.awardType} Type`}
                                value={this.state.typeDesc} />
                            <DetailRow
                                title="CFDA Program"
                                value={this.state.programName} />
                            <DetailRow
                                title="CFDA Program Description"
                                value={this.state.programDesc}
                                overflow={this.state.cfdaOverflow}
                                maxChars={SummaryPageHelper.maxDescriptionCharacters} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
FinancialAssistanceDetails.propTypes = propTypes;
