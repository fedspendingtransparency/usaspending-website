

import React from 'react';
import PropTypes from 'prop-types';
import { endsWith } from 'lodash';
import moment from 'moment';

import { convertDatesToRange } from 'helpers/timeRangeHelper';
import { datesByAwardType, isContract } from 'helpers/awardSummaryHelper';

const propTypes = {
    dates: PropTypes.object,
    awardType: PropTypes.string
};

const AwardStatus = ({ dates, awardType }) => {
    const { startDate, endDate, currentEndDate } = datesByAwardType(dates, awardType);
    const contract = isContract();
    const awardStatus = () => {
        const today = moment();
        let end = endDate;
        if (contract) end = currentEndDate;
        end = end.add(1, 'd');
        if (!startDate || !endDate) return '';
        let status = '';
        // not started
        if (today.isBefore(startDate)) status = 'Not Started';
        // In Progress or Open
        if (today.isAfter(startDate) && today.isBefore(end)) {
            status = contract ? 'Open' : 'In Progress';
        }
        // Completed or Closed
        if (today.isAfter(end)) status = contract ? 'Closed' : 'Completed';
        return status;
    };

    const timeRemaining = () => {
        let dateToCompare = contract ? currentEndDate : endDate;
        if (!dateToCompare) return '';
        dateToCompare = dateToCompare.add(1, 'd');
        const remainingTime = convertDatesToRange(moment(), dateToCompare);
        if (!remainingTime || (moment().isBefore(startDate))) return null;
        return `(${remainingTime} ${endsWith(remainingTime, 's') ? 'remain' : 'remains'})`;
    };

    const time = timeRemaining();

    return (
        <div className="award-status-container">
            <h5 className={`award-status__text award-status-container__status ${time ? 'award-status__text-space' : ''}`}>
                {awardStatus()}
            </h5>
            <h5 className="award-status__text award-status-container__time-remaining">{time}</h5>
        </div>
    );
};

AwardStatus.propTypes = propTypes;

export default AwardStatus;
