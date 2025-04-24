/**
 * ExplorerSidebar.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';

import { Home } from 'components/sharedComponents/icons/Icons';
import QuarterPickerWithFY from 'components/sharedComponents/QuarterPickerWithFY';
import VerticalTrail from './VerticalTrail';


const propTypes = {
    fy: PropTypes.string,
    quarter: PropTypes.string,
    period: PropTypes.string,
    trail: PropTypes.object,
    setExplorerPeriod: PropTypes.func,
    rewindToFilter: PropTypes.func
};

export default class ExplorerSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showFYMenu: false
        };

        this._queuedAnalyticEvent = null;

        this.toggleFYMenu = this.toggleFYMenu.bind(this);
        this.logTimePeriodEvent = this.logTimePeriodEvent.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
        this.pickedQuarter = this.pickedQuarter.bind(this);
    }

    toggleFYMenu() {
        this.setState({
            showFYMenu: !this.state.showFYMenu
        });
    }

    logTimePeriodEvent(quarter, fiscalYear) {
    // discard any previously scheduled time period analytic events that haven't run yet
        if (this._queuedAnalyticEvent) {
            window.clearTimeout(this._queuedAnalyticEvent);
        }

        // only log analytic event after 10 seconds
        this._queuedAnalyticEvent = window.setTimeout(() => {
            Analytics.event({
                event: 'spending-explorer-time-period',
                category: 'Spending Explorer - Time Period',
                action: `Q${quarter} FY${fiscalYear}`
            });
        }, 10 * 1000);
    }

    pickedYear(year, period = null) {
        if (year >= 2020) {
            this.props.setExplorerPeriod({
                fy: `${year}`,
                period: `${period}`,
                quarter: null
            });
            // Log analytic event
            this.logTimePeriodEvent(period, year);
        }
        else {
            this.props.setExplorerPeriod({
                fy: `${year}`,
                quarter: `4`,
                period: null
            });
            // Log analytic event
            this.logTimePeriodEvent('4', year);
        }
        this.setState({
            showFYMenu: false
        });
    }

    pickedQuarter(input) {
        let quarter = input;
        if (typeof input !== 'string') {
            quarter = `${input}`;
        }

        // Log analytic event
        this.logTimePeriodEvent(quarter, this.props.fy);
        if (this.props.fy >= 2020) {
            this.props.setExplorerPeriod({
                period: quarter,
                fy: this.props.fy,
                quarter: null
            });
        }
        else {
            this.props.setExplorerPeriod({
                quarter,
                fy: this.props.fy,
                period: null
            });
        }
    }

    render() {
        return (
            <div className="explorer-sidebar">
                <div className="start-over">
                    <Link
                        className="start-over-button"
                        to="/explorer">
                        <div className="content">
                            <div className="icon">
                                <Home alt="Home" />
                            </div>
                            <div className="label">
                                Start Over
                            </div>
                        </div>
                    </Link>
                </div>

                <QuarterPickerWithFY
                    selectedFy={this.props.fy}
                    handleQuarterPickerSelection={this.pickedQuarter}
                    handlePickedYear={this.pickedYear}
                    latestSelectedTimeInterval={this.props.period == null ? this.props.quarter : this.props.period} />
                <VerticalTrail
                    trail={this.props.trail.toArray()}
                    rewindToFilter={this.props.rewindToFilter} />

            </div>
        );
    }
}

ExplorerSidebar.propTypes = propTypes;
