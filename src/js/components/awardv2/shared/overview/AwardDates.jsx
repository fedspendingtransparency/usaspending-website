/**
 * IdvDates.jsx now AwardDates
 * Created by Lizzie Salita 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';

import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import moment from 'moment';
import InfoTooltip from '../InfoTooltip';
import { datesInfoIDV, datesInfoContract, datesInfoAssistance } from '../InfoTooltipContent';

const propTypes = {
    dates: PropTypes.object,
    awardType: PropTypes.string
};

const titles = {
    idv: ['Start Date', 'Ordering Period End Date'],
    contract: ['Start Date', 'Current End Date', 'Potential End Date'],
    grant: ['Start Date', 'Current End Date'],
    loan: ['Start Date', 'Current End Date'],
    'direct payment': ['Start Date', 'Current End Date'],
    insurance: ['Start Date', 'Current End Date'],
    other: ['Start Date', 'Current End Date']
};

export default class AwardDates extends React.Component {
    tooltipInfo() {
        const { awardType } = this.props;
        if (awardType === 'idv') return datesInfoIDV;
        if (awardType === 'contract') return datesInfoContract;
        if (awardType === 'definitive contract') return datesInfoContract;
        return datesInfoAssistance;
    }

    timelineInfo(startDate, endDate) {
        let timeline = (
            <div className="timeline" />
        );
        let remainingText = '';
        let remainingLabel = '';
        if (startDate && endDate) {
            const today = moment();
            const totalTime = endDate.diff(startDate, 'days');
            const remainingDays = endDate.diff(today, 'days');

            let remainingPercent = 0;
            if (remainingDays > 0) {
                remainingText = TimeRangeHelper.convertDatesToRange(today, endDate);
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
                        {
                            (remainingLabel !== 'Completed') &&
                            <div
                                style={todayStyle}
                                className="timeline__today">
                                Today
                            </div>
                        }
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

        return { timeline, remainingText, remainingLabel };
    }

    datesByAwardType() {
        const { awardType, dates } = this.props;
        const startDate = dates._startDate;
        let endDate = dates._endDate;
        if (awardType === 'contract' || awardType === 'definitive contract') {
            endDate = dates._potentialEndDate;
        }
        return { startDate, endDate };
    }

    render() {
        const { awardType } = this.props;
        const { startDateLong, endDateLong, potentialEndDateLong } = this.props.dates;
        const { startDate, endDate } = this.datesByAwardType();
        const { timeline, remainingText, remainingLabel } = this.timelineInfo(startDate, endDate);
        const tooltipInfo = this.tooltipInfo();

        return (
            <div className="award-dates">
                <div className="award-dates__heading">
                    <div className="award-overview__title award-dates__title">
                        Dates
                        <InfoTooltip left>
                            {tooltipInfo}
                        </InfoTooltip>
                    </div>
                    <div className="award-dates__remaining">
                        {remainingText}
                        <span className="award-dates__remaining award-dates__remaining_label">
                            {remainingLabel}
                        </span>
                    </div>
                </div>
                {timeline}
                <div className="award-dates__row">
                    <div className="award-dates__label-container">
                        <div className="award-dates__circle award-dates__circle-top" />
                        <div className="award-dates__label">
                            {titles[awardType][0]}
                        </div>
                    </div>
                    <div className="award-dates__date">
                        {startDateLong || 'not provided'}
                    </div>
                </div>
                <div className="award-dates__row">
                    <div className="award-dates__label-container">
                        <div className="award-dates__circle award-dates__circle-middle" />
                        <div className="award-dates__label">
                            {titles[awardType][1]}
                        </div>
                    </div>
                    <div className="award-dates__date">
                        {endDateLong || 'not provided'}
                    </div>
                </div>
                {
                    titles[awardType][2] &&
                    <div className="award-dates__row">
                        <div className="award-dates__label-container">
                            <div className="award-dates__circle award-dates__circle-bottom" />
                            <div className="award-dates__label">
                                {titles[awardType][2]}
                            </div>
                        </div>
                        <div className="award-dates__date">
                            {potentialEndDateLong || 'not provided'}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

AwardDates.propTypes = propTypes;
