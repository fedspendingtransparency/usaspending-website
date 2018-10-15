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
        const unformattedObligated = award._amount;
        const unformattedCurrent = award._obligation;
        const potential = award._currentTotal;
        const obligatedPercentage = Math.round((unformattedObligated / potential) * 100);
        const currentPercentage = Math.round((unformattedCurrent / potential) * 100);

        // Here, we used linear gradients to represent the different colors in the stats bar. We take the obligated precentage as
        // a starting point for the first color (for example 33%, the first color fills to 33% of the bar then stops),
        // then we reuse the obligated perecentage as a starting point for the second color and have that second color end at the
        // current percentage (for example the second color starts 33% and stops 66%). After that, we reuse the current percentage for the last color
        // (for example, the last color starts at 66%, then fills up the rest of the bar)
        const style = {
            background: `linear-gradient(to right, #4773aa ${obligatedPercentage}%, #c1ccda ${obligatedPercentage}%, #c1ccda ${currentPercentage}%, #ececec ${currentPercentage}%)`
        };

        const timeRange = TimeRangeHelper.convertDatesToRange(award.periodOfPerformance._endDate, award.periodOfPerformance._potentialEndDate);
        const popDate = timeRange.substr(1).slice(0, -1) || '--';

        const unformattedStartDate = award.periodOfPerformance._startDate;
        const unformattedEndDate = award.periodOfPerformance._endDate;
        const unformattedAwardDate = award._awardDate;
        const unformattedPotentialEndDate = award._potentialEndDate;
        const today = moment();
        //const todayMarker = (today.diff(unformattedStartDate, "days")) / (unformattedPotentialEndDate.diff(unformattedAwardDate, "days"));

        return (
            <div className="award__col award-amountdates">
                <div className="award-amountdates__amounts">
                    <div className="award-amountdates__amounts-heading">
                        <span className="award-amountdates__amounts-title">Award Amounts <span className="award-amountdates__amounts-info"><Icons.InfoCircle /></span></span> <span className="award-amountdates__amounts-remaining">{award.remaining}<span className="award-amountdates__amounts-remaining-text">Remaining</span></span>
                    </div>
                    <div className="award-amountdates__amounts-stats" style={style} />
                    <div className="award-amountdates__amounts-details-container">
                        <div className="award-amountdates__amounts-details"><span><span className="award-amountdates__amounts-circle_blue" />Dollars Obligated</span> <span>{award.amount}</span></div>
                        <div className="award-amountdates__amounts-details"><span><span className="award-amountdates__amounts-circle_gray" />Current Award</span> <span>{award.obligation}</span></div>
                        <div className="award-amountdates__amounts-details"><span><span className="award-amountdates__amounts-circle_light-gray" />Potential Award</span> <span>{award.currentTotal}</span></div>
                    </div>
                </div>
                <div className="award-amountdates__amounts">
                    <div className="award-amountdates__amounts-heading">
                        <span className="award-amountdates__amounts-title">Dates <span className="award-amountdates__amounts-info"><Icons.InfoCircle /></span></span> <span className="award-amountdates__amounts-remaining">{popDate}<span className="award-amountdates__amounts-remaining-text">Remaining</span></span>
                    </div>
                    <div className="award-amountdates__amounts-stats" style={style} />
                    <div className="award-amountdates__amounts-details-container">
                        <div className="award-amountdates__amounts-details"><span>Awarded on</span> <span>{award.periodOfPerformance.awardDate}</span></div>
                        <div className="award-amountdates__amounts-details"><span>Last Modified on</span> <span>{award.periodOfPerformance.lastModifiedDate}</span></div>
                        <div className="award-amountdates__amounts-details"><span><span className="award-amountdates__amounts-circle_dark-gray" />Current Completion Date</span> <span>{award.periodOfPerformance.endDate}</span></div>
                        <div className="award-amountdates__amounts-details"><span><span className="award-amountdates__amounts-circle_light-gray" />Potential Completion Date</span> <span>{award.periodOfPerformance.potentialEndDate}</span></div>
                    </div>
                </div>
            </div>
        );
    }
}
AmountDates.propTypes = propTypes;
