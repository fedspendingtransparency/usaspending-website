/**
 * StateOverview.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import AwardBreakdownContainer from 'containers/state/visualizations/awardBreakdown/AwardBreakdownContainer';
import GeoVisualizationSectionContainer from 'containers/state/visualizations/geo/GeoVisualizationSectionContainer';
import DetailsTooltip from './DetailsTooltip';

const propTypes = {
    stateProfile: PropTypes.object
};

export default class StateOverview extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hideFlag: true,
            flag: '',
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    componentDidMount() {
        this.prepareOverview(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateProfile.id !== this.props.stateProfile.id) {
            this.prepareOverview(this.props);
        }
    }

    prepareOverview(props) {
        let flag = null;
        let hideFlag = 'hide';
        if (props.stateProfile.flag !== '') {
            hideFlag = '';
            flag = (<img
                src={props.stateProfile.flag}
                alt={props.stateProfile.name} />);
        }

        this.setState({
            flag,
            hideFlag
        });
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        }, () => {
            const closeButton = document.querySelector('#state-overview-tooltip__close_icon');
            if (closeButton) {
                closeButton.focus();
            }
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    render() {
        let populationSourceYear = '';
        let incomeSourceYear = '';

        if ((this.props.stateProfile.population !== "--") && this.props.stateProfile.populationSourceYear) {
            populationSourceYear = `(${this.props.stateProfile.populationSourceYear} est.)`;
        }
        if ((this.props.stateProfile.medianHouseholdIncome !== "--") && this.props.stateProfile.incomeSourceYear) {
            incomeSourceYear = `(${this.props.stateProfile.incomeSourceYear} est.)`;
        }

        let tooltip = null;
        if (this.state.showInfoTooltip) {
            tooltip = (
                <DetailsTooltip
                    showInfoTooltip={this.state.showInfoTooltip}
                    closeTooltip={this.closeTooltip} />
            );
        }

        return (
            <div
                id="state-overview"
                className="state-section state-overview">
                <div className="state-overview__title-wrapper">
                    <div className={`state-overview__flag ${this.state.hideFlag}`}>
                        {this.state.flag}
                    </div>
                    <h2 className="state-overview__title">{this.props.stateProfile.name}</h2>
                </div>
                <hr className="results-divider" />
                <div className="state-overview__content">
                    <div className="state-overview__note">
                        <strong>Note:</strong> All data on this page is based on Primary Place of Performance.
                    </div>
                    <div className="state-section__row">
                        <div className="state-section__viz totals">
                            <h3 className="state-overview__heading">
                                Total Awarded Amount
                            </h3>
                            <div className="totals__amount">
                                {this.props.stateProfile.totalAmount}
                            </div>
                            <div className="totals__awards">
                                from <span className="state-overview__total">{this.props.stateProfile.totalAwards}</span> prime awards
                            </div>
                        </div>
                        <div className="state-section__viz details">
                            <h3 className="state-overview__heading">
                                Details
                                <span className="details__info_icon_holder">
                                    <button
                                        id="details__info_icon"
                                        className="details__info_icon"
                                        onFocus={this.showTooltip}
                                        onBlur={this.closeTooltip}
                                        onMouseEnter={this.showTooltip}
                                        onClick={this.showTooltip}>
                                        <InfoCircle />
                                    </button>
                                </span>
                            </h3>
                            {tooltip}
                            <table className="details__table">
                                <tbody>
                                    <tr>
                                        <th>Population</th>
                                        <td>{this.props.stateProfile.population} {populationSourceYear}</td>
                                    </tr>
                                    <tr>
                                        <th>Awarded Amount Per Capita</th>
                                        <td>{this.props.stateProfile.awardAmountPerCapita}</td>
                                    </tr>
                                    <tr>
                                        <th>Median Household Income</th>
                                        <td>{this.props.stateProfile.medianHouseholdIncome} {incomeSourceYear}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="state-section__row">
                        <div className="state-section__viz award-breakdown">
                            <h3 className="state-overview__heading">
                                Award Breakdown
                            </h3>
                            <AwardBreakdownContainer />
                        </div>
                        <div className="state-section__viz geo">
                            <h3 className="state-overview__heading">
                                Primary Place of Performance
                            </h3>
                            <GeoVisualizationSectionContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StateOverview.propTypes = propTypes;
