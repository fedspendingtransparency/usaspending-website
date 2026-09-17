/**
 * ExplorerSidebar.jsx
 * Created by Kevin Li 8/16/17
 */

import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Analytics from 'helpers/analytics/Analytics';

import { Home } from 'components/sharedComponents/icons/Icons';
import QuarterPickerWithFY from 'components/sharedComponents/QuarterPickerWithFY';
import { useLatestAccountData } from "../../../../containers/account/WithLatestFy";
import VerticalTrail from './VerticalTrail';


const propTypes = {
    fy: PropTypes.string,
    quarter: PropTypes.string,
    period: PropTypes.string,
    trail: PropTypes.object,
    setExplorerPeriod: PropTypes.func,
    rewindToFilter: PropTypes.func
};

const ExplorerSidebar = ({
    fy,
    quarter,
    period,
    trail,
    setExplorerPeriod,
    rewindToFilter
}) => {
    const [, allPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();
    const _queuedAnalyticEvent = useRef(null);

    const logTimePeriodEvent = (quarter, fiscalYear) => {
        // discard any previously scheduled time period analytic events that haven't run yet
        if (_queuedAnalyticEvent.current) {
            window.clearTimeout(_queuedAnalyticEvent.current);
        }

        // only log analytic event after 10 seconds
        _queuedAnalyticEvent.current = window.setTimeout(() => {
            Analytics.event({
                event: 'spending-explorer-time-period',
                category: 'Spending Explorer - Time Period',
                action: `Q${quarter} FY${fiscalYear}`
            });
        }, 10 * 1000);
    };

    const pickedYear = useCallback((year, period = null) => {
        if (year >= 2020) {
            setExplorerPeriod({
                fy: `${year}`,
                period: `${period}`,
                quarter: null
            });

            // Log analytic event
            logTimePeriodEvent(period, year);
        }
        else {
            setExplorerPeriod({
                fy: `${year}`,
                quarter: `4`,
                period: null
            });

            // Log analytic event
            logTimePeriodEvent('4', year);
        }
    }, []);

    const pickedQuarter = (input) => {
        let quarter = input;
        if (typeof input !== 'string') {
            quarter = `${input}`;
        }

        // Log analytic event
        logTimePeriodEvent(quarter, fy);
        if (fy >= 2020) {
            setExplorerPeriod({
                period: quarter,
                fy: fy,
                quarter: null
            });
        }
        else {
            setExplorerPeriod({
                quarter,
                fy: fy,
                period: null
            });
        }
    };

    useEffect(() => {
        // fetch periods on first render
        if (latestFy && latestPeriod) {
            pickedYear(`${latestFy}`, `${latestPeriod}`);
        }
    }, [latestFy, latestPeriod, pickedYear]);

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
                selectedFy={fy}
                handleQuarterPickerSelection={pickedQuarter}
                handlePickedYear={pickedYear}
                latestSelectedTimeInterval={period == null ? quarter : period}
                allPeriods={allPeriods}
                latestFy={latestFy} />
            <VerticalTrail
                trail={trail.toArray()}
                rewindToFilter={rewindToFilter} />

        </div>
    );
}

ExplorerSidebar.propTypes = propTypes;
export default ExplorerSidebar;
