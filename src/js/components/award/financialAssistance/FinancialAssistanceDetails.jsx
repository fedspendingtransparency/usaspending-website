/**
 * FinancialAssistanceDetails.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import moment from 'moment';
import { capitalize } from 'lodash';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';
import DetailRow from '../DetailRow';

const propTypes = {
    selectedAward: React.PropTypes.object,
    seeAdditional: React.PropTypes.func
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

        // bind functions
        this.setValues = this.setValues.bind(this);
    }

    componentWillReceiveProps() {
        this.setValues(this.props.selectedAward);
    }

    setValues() {
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

        // Location
        let popPlace = "Not Available";
        let cityState = null;
        const city = award.pop_city;
        const stateProvince = award.pop_state_province;
        if (city && stateProvince) {
            cityState = `${city}, ${stateProvince}`;
        }
        else if (city) {
            cityState = city;
        }
        else if (stateProvince) {
            cityState = stateProvince;
        }
        if (award.pop_country_code === 'USA') {
            popPlace = `${cityState} ${award.pop_zip}`;
            if (award.pop_state_code && award.pop_congressional_district) {
                popPlace +=
            `\nCongressional District: ${award.pop_state_code}-${award.pop_congressional_district}`;
            }
        }
        else if (award.pop_country_code !== 'USA') {
            popPlace = `${award.pop_country}`;
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

        if (latestTransaction.assistance_data.cfda) {
            const cfda = latestTransaction.assistance_data.cfda;
            if (cfda.program_number && cfda.program_title) {
                programName = `${latestTransaction.assistance_data.cfda.program_number} - \
${latestTransaction.assistance_data.cfda.program_title}`;
            }
            else if (cfda.program_number) {
                programName = cfda.program_number;
            }
            else if (cfda.program_title) {
                programName = cfda.program_title;
            }

            if (cfda.objectives) {
                programDescription = cfda.objectives;
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
            place: popPlace,
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
