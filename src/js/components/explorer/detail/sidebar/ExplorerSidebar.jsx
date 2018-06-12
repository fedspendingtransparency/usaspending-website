/**
 * ExplorerSidebar.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

import { Home } from 'components/sharedComponents/icons/Icons';
import { lastCompletedQuarterInFY } from 'containers/explorer/detail/helpers/explorerQuarters';

import VerticalTrail from './VerticalTrail';
import QuarterPicker from './QuarterPicker';

const propTypes = {
    fy: PropTypes.string,
    quarter: PropTypes.string,
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
                category: 'Spending Explorer - Time Period',
                action: `Q${quarter} FY${fiscalYear}`
            });
        }, 10 * 1000);
    }

    pickedYear(year) {
        const lastQuarter = lastCompletedQuarterInFY(year);

        // Log analytic event
        this.logTimePeriodEvent(lastQuarter.quarter, lastQuarter.year);

        this.props.setExplorerPeriod({
            fy: `${lastQuarter.year}`,
            quarter: `${lastQuarter.quarter}`
        });
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

        this.props.setExplorerPeriod({
            quarter,
            fy: this.props.fy
        });
    }

    render() {
        return (
            <div className="explorer-sidebar">
                <div className="start-over">
                    <a
                        className="start-over-button"
                        href="#/explorer">
                        <div className="content">
                            <div className="icon">
                                <Home alt="Home" />
                            </div>
                            <div className="label">
                                Start Over
                            </div>
                        </div>
                    </a>
                </div>

                <QuarterPicker
                    fy={this.props.fy}
                    quarter={this.props.quarter}
                    pickedQuarter={this.pickedQuarter}
                    pickedYear={this.pickedYear} />

                <VerticalTrail
                    trail={this.props.trail.toArray()}
                    rewindToFilter={this.props.rewindToFilter} />

            </div>
        );
    }
}

ExplorerSidebar.propTypes = propTypes;
