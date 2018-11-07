/**
 * AwardRecipient.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class AwardRecipient extends React.Component {
    render() {
        const award = this.props.selectedAward;
        return (

            <div className="award__col award-recipient">
                <div className="award-recipient__awarding">
                    <span className="award-recipient__awarding-title">Awarding Agency</span>
                    <span className="award-recipient__awarding-detail">{`${award.awardingAgency.toptierName} ${award.awardingAgency.toptierAbbr}`}</span> <br />
                    <span><span className="award-recipient__awarding-icon"><Icons.ArrowDown /></span><a className="award-recipient__awarding-info" href="#">View additional information</a></span>
                </div>
                <div className="award-recipient__recipient">
                    <span className="award-recipient__recipient-title">Recipient</span> <br />
                    <span className="award-recipient__recipient-detail"><a href={`/#/recipient/${award.recipient.internalId}`}>{award.recipient.name}</a></span>
                </div>
            </div>
        );
    }
}
AwardRecipient.propTypes = propTypes;
