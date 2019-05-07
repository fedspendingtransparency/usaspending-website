/**
 * IDVAmounts.jsx
 * Created by David Trinh 2/19/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import IDVBanner from './IDVBanner';

const propTypes = {
    awards: PropTypes.object
};

export default class IDVAmounts extends React.Component {
    render() {
        const awards = this.props.awards;
        return (
            <div className="award-amounts__content">
                <IDVBanner />
                <div className="award-amounts__data-wrapper">
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Obligated Amount</div>
                        <span>{awards.totalObligationFormatted}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Base &#38; Exercised Options</div>
                        <span>{awards.baseExercisedOptionsFormatted}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Base &#38; All Options</div>
                        <span>{awards.baseAndAllOptionsFormatted}</span>
                    </div>
                </div>
            </div>
        );
    }
}
IDVAmounts.propTypes = propTypes;
