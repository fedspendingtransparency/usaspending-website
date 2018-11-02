/**
 * AwardRecipient.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class AwardRecipient extends React.Component {
    render() {
        const award = this.props.selectedAward;
        return (

            <div className="award__col award-overview">
                <div className="award-overview__awarding">
                    <span className="award-overview__awarding-title">Awarding Agency</span> <br />
                    <span className="award-overview__awarding-detail">{`${award.awardingAgency.toptierName} ${award.awardingAgency.toptierAbbr}`}</span> <br />
                    <a className="award-overview__awarding-info" href="#">View addtional information</a>
                </div>
                <div className="award-overview__recipient">
                    <span className="award-overview__recipient-title">Recipient</span> <br />
                    <span className="award-overview__recipient-detail"><a href={`/#/recipient/${award.recipient.internalId}`}>{award.recipient.name}</a></span>
                </div>
            </div>
        );
    }
}
AwardRecipient.propTypes = propTypes;
