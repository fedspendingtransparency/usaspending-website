/**
 * AmountDates.jsx
 * Created by David Trinh 10/12/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import moment from 'moment';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class AmountDates extends React.Component {
    render() {
        const award = this.props.selectedAward;
        const unformattedObligated = award._obligation;
        const unformattedExercisedOption = award._baseExercisedOptions;
        const baseAndAll = award._amount;
        const obligatedPercentage = Math.round(Math.abs((unformattedObligated / baseAndAll) * 100));
        const exercisedPercentage = Math.round(Math.abs((unformattedExercisedOption / baseAndAll) * 100)) - obligatedPercentage;

        const obligatedStyle = {
            width: `${obligatedPercentage}%`,
            backgroundColor: '#4773aa'
        };

        const exercisedStyle = {
            width: `${exercisedPercentage}%`,
            backgroundColor: '#d8d8d8'
        };

        const timeRange = TimeRangeHelper.convertDatesToRange(award.periodOfPerformance._endDate, award.periodOfPerformance._potentialEndDate);
        let popDate = timeRange.substr(1).slice(0, -1) || '--';

        const unformattedEndDate = award.periodOfPerformance._endDate;
        const unformattedAwardDate = award.periodOfPerformance._awardDate;
        const unformattedPotentialEndDate = award.periodOfPerformance._potentialEndDate;
        const today = moment();
        const todayMarker = Math.round(((today.diff(unformattedAwardDate, "days")) / (unformattedPotentialEndDate.diff(unformattedAwardDate, "days"))) * 100);
        const totalDate = (unformattedPotentialEndDate.diff(unformattedAwardDate, "days"));
        const timePercentage = Math.round((unformattedEndDate.diff(unformattedAwardDate, 'days') / totalDate) * 100);

        let dateLabel = "Remaining";

        const timeStyle = {
            width: `${timePercentage}%`,
            backgroundColor: '#9b9b9b'
        };

        const lineStyle = {
            position: 'absolute',
            left: `${todayMarker}%`,
            border: 'solid 1px rgba(245, 166, 35, 0.5)',
            height: '13px',
            top: '-10px'
        };

        const lineContentStyle = {
            position: 'absolute',
            textTransform: 'uppercase',
            left: `${todayMarker + 2}%`,
            top: '-11px',
            color: 'rgb(245, 166, 35)',
            fontSize: '8px'
        };

        if (timePercentage === 100) {
            lineStyle.display = 'none';
            popDate = '';
            lineContentStyle.display = 'none';
            dateLabel = 'Completed';
        }

        return (
            <div className="award__col award-amountdates">
                <div className="award-amountdates__amounts">
                    <div className="award-amountdates__heading">
                        <span className="award-amountdates__heading-title">Award Amounts <span className="award-amountdates__heading-info"><Icons.InfoCircle /></span></span> <span className="award-amountdates__heading-remaining">{award.remaining}<span className="award-amountdates__heading-remaining-text">Remaining</span></span>
                    </div>
                    <div className="award-amountdates__stats-amounts">
                        <div className="award-amountdates__stats-inner" style={obligatedStyle} />
                        <div className="award-amountdates__stats-inner" style={exercisedStyle} />
                    </div>
                    <div className="award-amountdates__details-container">
                        <div className="award-amountdates__details"><span><span className="award-amountdates__circle_blue" />Transaction Obligated</span> <span>{award.obligation}</span></div>
                        <div className="award-amountdates__details"><span><span className="award-amountdates__circle_gray" />Base &amp; Exercised Options</span> <span>{award.baseExercisedOptions}</span></div>
                        <div className="award-amountdates__details"><span><span className="award-amountdates__circle_light-gray" />Base &amp; All Options</span> <span>{award.amount}</span></div>
                    </div>
                </div>
                <div className="award-amountdates__amounts">
                    <div className="award-amountdates__heading">
                        <span className="award-amountdates__heading-title">Dates <span className="award-amountdates__heading-info"><Icons.InfoCircle /></span></span> <span className="award-amountdates__heading-remaining">{popDate}<span className="award-amountdates__heading-remaining-text">{dateLabel}</span></span>
                    </div>
                    <div className="award-amountdates__stats-dates">
                        <div className="award-amountdates__stats-inner" style={timeStyle}>
                            <div style={lineStyle} />
                            <div style={lineContentStyle}>Today</div>
                        </div>
                        
                    </div>
                    <div className="award-amountdates__details-container">
                        <div className="award-amountdates__details award-amountdates__details_indent"><span>Awarded on</span> <span>{award.periodOfPerformance.awardDate}</span></div>
                        <div className="award-amountdates__details award-amountdates__details_indent"><span>Last Modified on</span> <span>{award.periodOfPerformance.lastModifiedDate}</span></div>
                        <div className="award-amountdates__details"><span><span className="award-amountdates__circle_dark-gray" />Current Completion Date</span> <span>{award.periodOfPerformance.endDate}</span></div>
                        <div className="award-amountdates__details"><span><span className="award-amountdates__circle_light-gray" />Potential Completion Date</span> <span>{award.periodOfPerformance.potentialEndDate}</span></div>
                    </div>
                </div>
            </div>
        );
    }
}
AmountDates.propTypes = propTypes;
