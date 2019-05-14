/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
    awards: PropTypes.array,
    height: PropTypes.number
};

export default class ActivityChart extends React.Component {
    getEarliestStartDate() {
        const awards = this.props.awards;
        return awards.reduce((min, award) =>
            (moment(award.startDate).isSameOrBefore(moment(min)) ? award.startDate : min), awards[0].startDate
        );
    }
    getLatestEndDate() {
        const awards = this.props.awards;
        return awards.reduce((max, award) =>
            (moment(award.endDate).isSameOrAfter(moment(max)) ? award.endDate : max), awards[0].endDate
        );
    }
    getMaxAmount() {
        const awards = this.props.awards;
        return awards.reduce((max, award) =>
            ((award._awardedAmount > max) ? award._awardedAmount : max), awards[0]._awardedAmount
        );
    }
    getMinAmount() {
        const awards = this.props.awards;
        return awards.reduce((min, award) =>
            ((award._awardedAmount < min) ? award._awardedAmount : min), awards[0]._awardedAmount
        );
    }
    render() {
        return (
            <div className="activity-chart">
                <p>Start: {this.getEarliestStartDate()}</p>
                <p>End: {this.getLatestEndDate()}</p>
                <p>Min: {this.getMinAmount()}</p>
                <p>Max: {this.getMaxAmount()}</p>
            </div>
        );
    }
}

ActivityChart.propTypes = propTypes;
