/**
 * IdvDates.jsx now AwardDates
 * Created by Lizzie Salita 12/10/18
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { throttle, compact, endsWith } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';

import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import { getToolTipBySectionAndAwardType } from 'dataMapping/awardsv2/tooltips';
import { titles } from 'dataMapping/awardsv2/datesSection';
import ProgressBar from './ProgressBar';

const propTypes = {
    dates: PropTypes.object,
    awardType: PropTypes.string
};

export default class AwardDates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };
    }

    componentDidMount = () => {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = throttle(() => {
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth,
                visualizationWidth: this.datesDivWidth.offsetWidth
            });
        }
    }, 50)

    datesData = () => {
        const { startDate, endDate, currentEndDate } = this.datesByAwardType();
        return {
            start: startDate.valueOf(),
            end: endDate.valueOf(),
            currentEndDate: currentEndDate ? currentEndDate.valueOf() : null
        };
    }

    isContract = () => {
        const { awardType } = this.props;
        if (awardType === 'contract' || awardType === 'definitive contract') return true;
        return false;
    }

    datesByAwardType() {
        const { dates } = this.props;
        const startDate = dates._startDate;
        let endDate = dates._endDate;
        let currentEndDate = null;
        if (this.isContract()) {
            endDate = dates._potentialEndDate;
            currentEndDate = dates._endDate;
        }
        return { startDate, endDate, currentEndDate };
    }

    awardStatus = () => {
        const { startDate, endDate, currentEndDate } = this.datesByAwardType();
        const today = moment();
        let end = endDate;
        const isContract = this.isContract();
        if (isContract) end = currentEndDate;
        if (!startDate || !endDate) return '';
        let status = '';
        // not started
        if (today.isBefore(startDate)) status = 'Not Started';
        // In Progress or Open
        if (today.isAfter(startDate) && today.isBefore(end)) {
            status = isContract ? 'Open' : 'In Progress';
        }
        // Completed or Closed
        if (today.isAfter(end)) status = isContract ? 'Closed' : 'Completed';
        return status;
    }

    timeRemaining = () => {
        const { endDate, currentEndDate } = this.datesByAwardType();
        const dateToCompare = this.isContract() ? currentEndDate : endDate;
        if (!dateToCompare) return '';
        const timeRemaining = TimeRangeHelper.convertDatesToRange(moment(), dateToCompare);
        if (!timeRemaining) return timeRemaining;
        return `${timeRemaining} ${endsWith(timeRemaining, 's') ? 'remain' : 'remains'}`;
    }

    datesSection = () => {
        const { startDateLong, endDateLong, potentialEndDateLong } = this.props.dates;
        const datesTitles = this.titles();
        const readableDates = [startDateLong, endDateLong, potentialEndDateLong];
        return datesTitles.map((title, index) => {
            let circleClassName = 'award-dates__circle-top';
            if (datesTitles[index] === 'Current End Date') {
                circleClassName = 'award-dates__circle-middle';
            }
            if (
                datesTitles[index] === 'Ordering Period End Date' ||
                datesTitles[index] === 'End Date' ||
                datesTitles[index] === 'Potential End Date'
            ) {
                circleClassName = 'award-dates__circle-bottom';
            }
            return (
                <div key={title} className="award-dates__row">
                    <div className="award-dates__label-container">
                        <div className={`award-dates__circle ${circleClassName}`} />
                        <div className="award-dates__label">
                            {datesTitles[index]}
                        </div>
                    </div>
                    <div className="award-dates__date">
                        {readableDates[index] || 'not provided'}
                    </div>
                </div>
            );
        });
    }

    titles() {
        const { awardType } = this.props;
        if (!awardType) return ['', '', ''];
        return compact([
            titles[awardType][0],
            titles[awardType][1],
            titles[awardType][2]
        ]);
    }

    render() {
        const { awardType } = this.props;
        const { start, end, currentEndDate } = this.datesData();
        const tooltipInfo = getToolTipBySectionAndAwardType('dates', awardType);
        const progressDescription = 'A rectangle of color grey representing the period of progress';
        const startDescription = 'A circle of color green representing the start of progress';
        const endDescription = 'A circle of color red representing the end of progress';
        const lineDescription = 'A line of color gray representing current progress';
        const progressCircleDescription = 'A circle of color gray representing current progress';
        const milestones = this.isContract() ?
            [
                {
                    data: currentEndDate,
                    className: 'progress-bar-shapes__milestone-circle',
                    description: 'A circle of color gold representing the current end date'
                }
            ] :
            [];

        return (
            <div
                className="award-dates award-overview-column award-overview-column__spacing"
                ref={(widthRef) => {
                    this.datesDivWidth = widthRef;
                }}>
                <div className="award-dates__heading">
                    <h6 className="award-overview-title award-dates__title">
                        Dates
                        <TooltipWrapper className="award-section-tt" icon="info" left tooltipComponent={tooltipInfo} />
                    </h6>
                    <h6 className="award-overview-title award-dates__status">
                        {this.awardStatus()}
                    </h6>
                </div>
                <div className="award-dates__time-remaining">{this.timeRemaining()}</div>
                <ProgressBar
                    domain={[start, end]}
                    height={30}
                    width={this.state.visualizationWidth}
                    currentProgress={moment().valueOf()}
                    milestones={milestones}
                    progressText="Today"
                    textAdjustment={16}
                    awardType={this.props.awardType}
                    progressDescription={progressDescription}
                    startDescription={startDescription}
                    endDescription={endDescription}
                    lineDescription={lineDescription}
                    progressCircleDescription={progressCircleDescription} />
                {this.datesSection()}
            </div>
        );
    }
}

AwardDates.propTypes = propTypes;
