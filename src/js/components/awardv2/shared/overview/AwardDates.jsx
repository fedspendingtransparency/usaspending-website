/**
 * IdvDates.jsx now AwardDates
 * Created by Lizzie Salita 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as TimeRangeHelper from 'helpers/timeRangeHelper';

import InfoTooltip from '../InfoTooltip';
import { datesInfo } from '../InfoTooltipContent';
import AwardSection from '../AwardSection';

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
        if (awardType === 'idv') return datesInfo;
        if (awardType === 'contract') return null;
        if (awardType === 'definitive contract') return null;
        if (awardType === 'grant') return null;
        if (awardType === 'loan') return null;
        if (awardType === 'insurance') return null;
        if (awardType === 'direct payment') return null;
        if (awardType === 'other') return null;
        return null;
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
        const { dates, awardType } = this.props;
        const { startDate, endDate } = this.datesByAwardType();
        const { timeline, remainingText, remainingLabel } = this.timelineInfo(startDate, endDate);
        const tooltipInfo = this.tooltipInfo();

        return (
            <AwardSection type="column">
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
                        <div className="award-dates__label">
                            {titles[awardType][0]}
                        </div>
                        <div className="award-dates__date">
                            {dates.startDateLong || 'not provided'}
                        </div>
                    </div>
                    <div className="award-dates__row">
                        <div className="award-dates__label">
                            {titles[awardType][1]}
                        </div>
                        <div className="award-dates__date">
                            {dates.endDateLong || 'not provided'}
                        </div>
                    </div>
                    {
                        titles[awardType][2] &&
                        <div className="award-dates__row">
                            <div className="award-dates__label">
                                {titles[awardType][2]}
                            </div>
                            <div className="award-dates__date">
                                {dates.potentialEndDateLong || 'not provided'}
                            </div>
                        </div>
                    }
                </div>
            </AwardSection>
        );
    }
}

AwardDates.propTypes = propTypes;
