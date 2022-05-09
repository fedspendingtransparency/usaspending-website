/**
 * IdvDates.jsx now AwardDates
 * Created by Lizzie Salita 12/10/18
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { throttle, compact } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';

import { getToolTipBySectionAndAwardType } from 'dataMapping/award/tooltips';
import { titles } from 'dataMapping/award/datesSection';
import { datesByDateType, isContract, isBadDates } from 'helpers/awardSummaryHelper';
import ProgressBar from './ProgressBar';

const propTypes = {
    dates: PropTypes.object,
    awardType: PropTypes.string
};

const progressDescriptions = () => {
    const progressDescription = 'A rectangle of color grey representing the period of progress';
    const startDescription = 'A circle of color green representing the start of progress';
    const endDescription = 'A circle of color red representing the end of progress';
    const lineDescription = 'A line of color gray representing current progress';
    const progressVerticalLineDescription = 'A vertical line of color gray representing current progress';
    const progressTriangleDescription = 'A triangle of color gray representing the current progress';
    const progressTextDescription = 'Text with value Today of color gray representing value of progress';
    return {
        progressDescription,
        startDescription,
        endDescription,
        lineDescription,
        progressVerticalLineDescription,
        progressTriangleDescription,
        progressTextDescription
    };
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
    };

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
    }, 50);

    datesData = () => {
        const { dates, awardType } = this.props;
        const { startDate, endDate, currentEndDate } = datesByDateType(dates, awardType);
        return {
            start: startDate.valueOf(),
            end: endDate.valueOf(),
            currentEndDate: currentEndDate ? currentEndDate.valueOf() : null
        };
    };

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
    };

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
        const { awardType, dates } = this.props;
        const thisIsAContract = isContract(awardType);
        const { start, end, currentEndDate } = this.datesData();
        const badDomainData = isBadDates(datesByDateType(dates, awardType), awardType);
        const endDate = moment(end).add(1, 'd').valueOf();
        const currentEnd = moment(currentEndDate).add(1, 'd').valueOf();
        const tooltipInfo = getToolTipBySectionAndAwardType('dates', awardType);
        const milestones = thisIsAContract ?
            [
                {
                    data: currentEnd,
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
                        <TooltipWrapper
                            className="award-section-tt"
                            icon="info"
                            pointerPostion="left"
                            tooltipComponent={tooltipInfo} />
                    </h6>
                </div>
                <ProgressBar
                    domain={[start, endDate]}
                    heightOfSVG={40}
                    heightOfProgressBar={10}
                    width={this.state.visualizationWidth}
                    currentProgress={moment().valueOf()}
                    milestones={milestones}
                    progressText="Today"
                    badDomainData={badDomainData}
                    textAdjustment={{ x: 0, y: 20 }}
                    awardType={this.props.awardType}
                    descriptions={progressDescriptions()} />
                {this.datesSection()}
            </div>
        );
    }
}

AwardDates.propTypes = propTypes;
