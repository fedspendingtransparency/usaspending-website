

import React from 'react';
import PropTypes from 'prop-types';
import { endsWith } from 'lodash';

import { convertDatesToRange } from 'helpers/timeRangeHelper';
import { datesByDateType, isContract, isBadDates } from 'helpers/awardSummaryHelper';

const dayjs = require('dayjs');

const propTypes = {
    dates: PropTypes.object,
    awardType: PropTypes.string
};

const AwardStatus = ({ dates, awardType }) => {
    const { startDate, endDate, currentEndDate } = datesByDateType(dates, awardType);
    const badDates = isBadDates({ startDate, endDate, currentEndDate }, awardType);
    const contract = isContract(awardType);
    const awardStatus = () => {
        if (badDates) return '';
        const today = dayjs();
        let end = endDate;
        if (contract) end = currentEndDate;
        // Adding one day due to the need for the end date to be inclusive and duration is exact
        end = end.add(1, 'd');
        if (!startDate || !endDate) return '';
        let status = '';
        // not started
        if (today.isBefore(startDate)) status = 'Not Started';
        // In Progress or Open
        if (today.isAfter(startDate) && today.isBefore(end)) {
            status = (awardType === 'idv') ? 'Open' : 'In Progress';
        }
        // Completed or Closed
        if (today.isAfter(end)) status = (awardType === 'idv') ? 'Closed' : 'Completed';
        return status;
    };

    const timeRemaining = () => {
        if (badDates) return '';
        let dateToCompare = contract ? currentEndDate : endDate;
        if (!dateToCompare) return '';
        // Since we add one day for inclusivity to the status we want the time reamaining to
        // show the same
        dateToCompare = dateToCompare.add(1, 'd');
        const remainingTime = convertDatesToRange(dayjs(), dateToCompare);
        if (!remainingTime || (dayjs().isBefore(startDate))) return null;
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
