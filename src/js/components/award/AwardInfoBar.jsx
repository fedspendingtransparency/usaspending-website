/**
 * AwardInfoBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AgencyInfo from './AgencyInfo';
import RecipientInfo from './RecipientInfo';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class AwardInfoBar extends React.Component {
    render() {
        let agencies = null;
        if (this.props.selectedAward) {
            agencies = (
                <div className="award-info-bar">
                    <AgencyInfo
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                    <div className="triangle-wrapper" />
                    <RecipientInfo
                        recipient={this.props.selectedAward} />
                </div>
            );
        }
        return (
            <div>
                { agencies }
            </div>
        );
    }
}

AwardInfoBar.propTypes = propTypes;
