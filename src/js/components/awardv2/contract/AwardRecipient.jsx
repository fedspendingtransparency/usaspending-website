/**
 * AwardRecipient.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    selectedAward: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class AwardRecipient extends React.Component {
    render() {
        const award = this.props.selectedAward;
        return (

            <div className="award__col award-recipient">
                <div className="award-recipient__awarding">
                    <span className="award-recipient__awarding-title">Awarding Agency</span>
                    <div className="award-recipient__awarding-detail">
                        <a href={`/#/agency/${award.awardingAgency.id}`}>{`${award.awardingAgency.toptierName} ${award.awardingAgency.toptierAbbr}`}</a>
                    </div>
                    <br />
                    <div>
                        <span className={`award-recipient__awarding-icon ${award.category !== 'contract' ? 'award-recipient__awarding-icon_hide' : ''}`}><Icons.ArrowDown /></span>
                        <button className={`award-recipient__awarding-info ${award.category !== 'contract' ? 'award-recipinet__awarding-info_hide' : ''}`} onClick={() => this.props.jumpToSection('additional-information')}>View additional information</button>
                    </div>
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
