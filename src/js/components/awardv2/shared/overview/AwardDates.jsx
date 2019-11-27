/**
 * IdvDates.jsx now AwardDates
 * Created by Lizzie Salita 12/10/18
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TooltipWrapper } from 'data-transparency-ui';

// import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import ProgressBar from './ProgressBar';
import { getToolTipBySectionAndAwardType } from 'dataMapping/awardsv2/tooltips';
import { titles } from 'dataMapping/awardsv2/datesSection';

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

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = () => {
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth,
                visualizationWidth: this.datesDivWidth.offsetWidth
            });
        }
    }

    datesData = () => {
        const { startDate, endDate, thirdCircleData } = this.datesByAwardType();
        return {
            start: startDate.valueOf(),
            end: endDate.valueOf(),
            thirdCircleData: thirdCircleData ? thirdCircleData.valueOf() : null
        };
    }

    datesByAwardType() {
        const { awardType, dates } = this.props;
        const startDate = dates._startDate;
        let endDate = dates._endDate;
        let thirdCircleData = null;
        if (awardType === 'contract' || awardType === 'definitive contract') {
            endDate = dates._potentialEndDate;
            thirdCircleData = dates._endDate;
        }
        return { startDate, endDate, thirdCircleData };
    }

    titles() {
        const { awardType } = this.props;
        if (!awardType) return ['', '', ''];
        return [
            titles[awardType][0],
            titles[awardType][1],
            titles[awardType][2]
        ];
    }

    render() {
        const { dates, awardType } = this.props;
        // const { startDate, endDate } = this.datesByAwardType();
        const { start, end, thirdCircleData } = this.datesData();
        // const { remainingText, remainingLabel } = this.timelineInfo(startDate, endDate);
        const tooltipInfo = getToolTipBySectionAndAwardType('dates', awardType);
        const datesTitles = this.titles();
        return (
            <div
                className="award-dates award-overview-column"
                ref={(widthRef) => {
                    this.datesDivWidth = widthRef;
                }}>
                <div className="award-dates__heading">
                    <h6 className="award-overview-title award-dates__title">
                        Dates
                        <TooltipWrapper className="award-section-tt" icon="info" left tooltipComponent={tooltipInfo} />
                    </h6>
                </div>
                <ProgressBar
                    domain={[start, end]}
                    height={15}
                    width={this.state.visualizationWidth}
                    currentProgress={moment().valueOf()}
                    progressText="Today"
                    thirdCircleData={thirdCircleData} />
                <div className="award-dates__row">
                    <div className="award-dates__label">
                        {datesTitles[0]}
                    </div>
                    <div className="award-dates__date">
                        {dates.startDateLong || 'not provided'}
                    </div>
                </div>
                <div className="award-dates__row">
                    <div className="award-dates__label">
                        {datesTitles[1]}
                    </div>
                    <div className="award-dates__date">
                        {dates.endDateLong || 'not provided'}
                    </div>
                </div>
                {
                    datesTitles[2] &&
                    <div className="award-dates__row">
                        <div className="award-dates__label">
                            {datesTitles[2]}
                        </div>
                        <div className="award-dates__date">
                            {dates.potentialEndDateLong || 'not provided'}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

AwardDates.propTypes = propTypes;
    // timelineInfo(startDate, endDate) {
    //     let timeline = (
    //         <div className="timeline" />
    //     );
    //     let remainingText = '';
    //     let remainingLabel = '';
    //     if (startDate && endDate) {
    //         const today = moment();
    //         const totalTime = endDate.diff(startDate, 'days');
    //         const remainingDays = endDate.diff(today, 'days');

    //         let remainingPercent = 0;
    //         if (remainingDays > 0) {
    //             remainingText = TimeRangeHelper.convertDatesToRange(today, endDate);
    //             remainingLabel = 'Remain';
    //             remainingPercent = Math.round((remainingDays / totalTime) * 100);
    //         }
    //         else {
    //             remainingLabel = 'Completed';
    //         }
    //         const elapsedPercent = 100 - remainingPercent;

    //         const timelineStyle = {
    //             width: `${elapsedPercent}%`
    //         };
    //         const todayStyle = {
    //             left: `${elapsedPercent + 2}%`
    //         };
    //         const lineStyle = {
    //             left: `${elapsedPercent}%`
    //         };

    //         timeline = (
    //             <div
    //                 role="figure"
    //                 aria-labelledby="timeline-caption"
    //                 className="timeline">
    //                 <div
    //                     style={timelineStyle}
    //                     className="timeline__wrapper">
    //                     <div
    //                         style={lineStyle}
    //                         className="timeline__today-line" />
    //                     <div
    //                         style={todayStyle}
    //                         className="timeline__today">
    //                         Today
    //                     </div>
    //                 </div>
    //                 <p
    //                     className="hide"
    //                     id="timeline-caption">
    //                     A progress bar showing that as of today, {elapsedPercent}% of the total time from this
    //                     award&apos;s start date to end date has elapsed, and {remainingPercent}% remains.
    //                 </p>
    //             </div>
    //         );
    //     }

    //     return { timeline, remainingText, remainingLabel };
    // }
