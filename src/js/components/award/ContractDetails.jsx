/**
 * ContractDetails.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import ContractCell from './ContractCell';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class ContractDetails extends React.Component {

    render() {
        const popDate = `${this.props.selectedAward.period_of_performance_start_date} -
        ${this.props.selectedAward.period_of_performance_current_end_date}`;
        const popPlace = `${this.props.selectedAward.pop_city},
            ${this.props.selectedAward.pop_state_province}`;
        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h4>Contract Details</h4>
                    <div className="border" />
                    <table>
                        <tbody>
                            <ContractCell
                                title="Description"
                                value={this.props.selectedAward.description} />
                            <ContractCell
                                title="Period of Performance"
                                value={popDate} />
                            <ContractCell
                                title="Primary Place of Performance"
                                value={popPlace} />
                            <ContractCell
                                title="Contract Award Type"
                                value={this.props.selectedAward.type_description} />
                            <ContractCell
                                title="Contract Pricing Type"
                                value="Unknown" />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
ContractDetails.propTypes = propTypes;
