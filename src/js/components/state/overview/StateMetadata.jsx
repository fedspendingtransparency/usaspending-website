/**
 * StateMetadata.jsx
 * Created by Lizzie Salita 5/3/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    stateProfile: PropTypes.object
};

export default class StateMetadata extends React.PureComponent {
    render() {
        let populationSourceYear = '';
        let incomeSourceYear = '';

        if ((this.props.stateProfile.population !== "--") && this.props.stateProfile.populationSourceYear) {
            populationSourceYear = `(${this.props.stateProfile.populationSourceYear} est.)`;
        }
        if ((this.props.stateProfile.medianHouseholdIncome !== "--") && this.props.stateProfile.incomeSourceYear) {
            incomeSourceYear = `(${this.props.stateProfile.incomeSourceYear} est.)`;
        }


        return (
            <div className="state-overview__metadata">
                <div className="state-overview__totals">
                    <h4 className="state-overview__heading">
                        Total Awarded Amount
                    </h4>
                    <div className="state-overview__total-amount">
                        {this.props.stateProfile.totalAmount}
                    </div>
                    <div>
                        from <span className="state-overview__total">{this.props.stateProfile.totalAwards}</span> awards
                    </div>
                </div>
                <div className="state-overview__details">
                    <h4 className="state-overview__heading">
                        Details
                    </h4>
                    <table className="state-overview__table">
                        <tbody>
                            <tr>
                                <td>
                                    Population
                                </td>
                                <td>
                                    {this.props.stateProfile.population} {populationSourceYear}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Awarded Amount Per Capita
                                </td>
                                <td>
                                    {this.props.stateProfile.awardAmountPerCapita}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Median Household Income
                                </td>
                                <td>
                                    {this.props.stateProfile.medianHouseholdIncome} {incomeSourceYear}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

StateMetadata.propTypes = propTypes;
