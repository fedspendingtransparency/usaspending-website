/**
 * ContractDetails.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import moment from 'moment';
import DetailRow from '../DetailRow';

const propTypes = {
    selectedAward: React.PropTypes.object,
    seeAdditional: React.PropTypes.func,
    maxChars: React.PropTypes.number
};

export default class ContractDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            desc: "",
            date: "",
            place: "",
            typeDesc: "",
            price: "",
            overflow: false
        };

        // bind functions
        this.setValues = this.setValues.bind(this);
    }

    componentWillReceiveProps() {
        this.setValues(this.props.selectedAward);
    }

    setValues(award) {
        let yearRangeTotal = "";
        let description = null;

        // Date Range
        const startDate = moment(award.period_of_performance_start_date, 'M/D/YYYY');
        const endDate = moment(award.period_of_performance_current_end_date, 'M/D/YYYY');
        const yearRange = endDate.diff(startDate, 'year');
        const monthRange = (endDate.diff(startDate, 'month') - (yearRange * 12));
        if (yearRange !== 0 && !Number.isNaN(yearRange)) {
            if (yearRange === 1) {
                yearRangeTotal = `${yearRange} year `;
            }
            else {
                yearRangeTotal = `${yearRange} years `;
            }
        }
        if (monthRange >= 1) {
            if (yearRange < 1 && monthRange > 1) {
                yearRangeTotal = `${monthRange} months`;
            }
            else if (monthRange === 1) {
                yearRangeTotal += `${monthRange} month`;
            }
            else {
                yearRangeTotal += `${monthRange} months`;
            }
        }
        if (yearRangeTotal) {
            yearRangeTotal = `(${yearRangeTotal})`;
        }
        const popDate = `${award.period_of_performance_start_date} -
            ${award.period_of_performance_current_end_date} ${yearRangeTotal}`;

        // Location
        let popPlace = "";
        let popZip = null;
        if (award.pop_zip) {
            popZip = award.pop_zip;
        }
        if (award.pop_city && award.pop_state_province && popZip) {
            popPlace = `${award.pop_city}, ${award.pop_state_province} ${popZip}`;
        }
        else if (award.pop_city && !award.pop_state_province && popZip) {
            popPlace = `${award.pop_city} ${popZip}`;
        }
        else if (award.pop_city && !award.pop_state_province && !popZip) {
            popPlace = award.pop_city;
        }
        else if (!award.pop_city && award.pop_state_province && popZip) {
            popPlace = `${award.pop_state_province} ${popZip}`;
        }
        else if (!award.pop_city && award.pop_state_province && award.pop_country && !popZip) {
            popPlace = `${award.pop_state_province}, ${award.pop_country}`;
        }
        if (award.description) {
            description = award.description;
        }
        else {
            description = "Not Available";
        }

        // Pricing
        let pricing = "Not Available";
        if (award.type_of_contract_pricing_description) {
            pricing = award.type_of_contract_pricing_description;
        }

        // char count
        let seeMore = false;
        if (award.description.length > this.props.maxChars) {
            seeMore = true;
        }

        this.setState({
            desc: description,
            overflow: seeMore,
            date: popDate,
            place: popPlace,
            typeDesc: award.type_description,
            price: pricing
        });
    }

    render() {
        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h3>Contract Details</h3>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                    <table>
                        <tbody>
                            <DetailRow
                                title="Description"
                                value={this.state.desc}
                                overflow={this.state.overflow}
                                maxChars={this.props.maxChars} />
                            <DetailRow
                                title="Period of Performance"
                                value={this.state.date} />
                            <DetailRow
                                title="Primary Place of Performance"
                                value={this.state.place} />
                            <DetailRow
                                title="Contract Award Type"
                                value={this.state.typeDesc} />
                            <DetailRow
                                title="Contract Pricing Type"
                                value={this.state.price} />
                        </tbody>
                    </table>
                </div>
                <button
                    className="see-more"
                    onClick={this.props.seeAdditional}>See Additional Details</button>
            </div>
        );
    }
}
ContractDetails.propTypes = propTypes;
