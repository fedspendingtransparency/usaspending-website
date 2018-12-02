/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Building, Table } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class AwardAmounts extends React.Component {  
    render() {
        const award = this.props.award;
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

        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <Building />
                    </div>
                    <h3 className="award-viz__title">
                        Combined Award Amounts
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    Amounts content here
                    <a
                        href="/"
                        className="award-viz__link">
                        <div className="award-viz__link-icon">
                            <Table />
                        </div>
                        <div className="award-viz__link-text">
                            View transactions table
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
