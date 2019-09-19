/**
 * IdvDates.jsx
 * Created by Lizzie Salita 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import moment from 'moment';
import InfoTooltip from '../shared/InfoTooltip';
import { datesInfo } from '../shared/InfoTooltipContent';

const propTypes = {
    dates: PropTypes.object
};

export default class IdvDates extends React.Component {
    render() {
        const dates = this.props.dates;
        let timeline = (
            <div className="timeline" />
        );
        let remainingText = '';
        let remainingLabel = '';

        if (dates._startDate && dates._endDate) {
            const today = moment();
            const totalTime = dates._endDate.diff(dates._startDate, 'days');
            const remainingDays = dates._endDate.diff(today, 'days');

            let remainingPercent = 0;
            if (remainingDays > 0) {
                remainingText = TimeRangeHelper.convertDatesToRange(today, dates._endDate);
                remainingLabel = 'Remain';
                remainingPercent = Math.round((remainingDays / totalTime) * 100);
            }
            else {
                remainingLabel = 'Completed';
            }
            const elapsedPercent = 100 - remainingPercent;

            const timelineStyle = {
                width: `${elapsedPercent}%`
            };
            const todayStyle = {
                left: `${elapsedPercent + 2}%`
            };
            const lineStyle = {
                left: `${elapsedPercent}%`
            };

            timeline = (
                <div
                    role="figure"
                    aria-labelledby="timeline-caption"
                    className="timeline">
                    <div
                        style={timelineStyle}
                        className="timeline__wrapper">
                        <div
                            style={lineStyle}
                            className="timeline__today-line" />
                        <div
                            style={todayStyle}
                            className="timeline__today">
                            Today
                        </div>
                    </div>
                    <p
                        className="hide"
                        id="timeline-caption">
                        A progress bar showing that as of today, {elapsedPercent}% of the total time from this
                        award&apos;s start date to end date has elapsed, and {remainingPercent}% remains.
                    </p>
                </div>
            );
        }

        return (
            <div className="idv-dates">
                <div className="idv-dates__heading">
                    <div className="award-overview__title idv-dates__title">
                        Dates
                        <InfoTooltip left>
                            {datesInfo}
                        </InfoTooltip>
                    </div>
                    <div className="idv-dates__remaining">
                        {remainingText}
                        <span className="idv-dates__remaining idv-dates__remaining_label">
                            {remainingLabel}
                        </span>
                    </div>
                </div>
                {timeline}
                <div className="idv-dates__row">
                    <div className="idv-dates__label">
                        Start Date
                    </div>
                    <div className="idv-dates__date">
                        {dates.startDateLong || 'not provided'}
                    </div>
                </div>
                <div className="idv-dates__row">
                    <div className="idv-dates__label">
                    Ordering Period End Date
                    </div>
                    <div className="idv-dates__date">
                        {dates.endDateLong || 'not provided'}
                    </div>
                </div>
            </div>
        );
    }
}

IdvDates.propTypes = propTypes;
