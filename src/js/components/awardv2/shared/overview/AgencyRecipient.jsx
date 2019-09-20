/**
 * AgencyRecipient.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';
import AwardSection from '../AwardSection';

const propTypes = {
    awardingAgency: PropTypes.object,
    recipient: PropTypes.object,
    category: PropTypes.string,
    jumpToSection: PropTypes.func
};

export default class AgencyRecipient extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToAdditionalInfo = this.jumpToAdditionalInfo.bind(this);
    }
    jumpToAdditionalInfo() {
        this.props.jumpToSection('additional-information');
    }
    formatRecipientLink(internalId, name) {
        if (internalId && name) {
            return (<a href={`#/recipient/${internalId}`}>{name}</a>);
        }
        else if (internalId) {
            return (<a href={`#/recipient/${internalId}`}>Unknown</a>);
        }
        return name;
    }
    render() {
        let additionalInfoLink = null;
        additionalInfoLink = (
            <div>
                <button
                    className="agency-recipient__awarding-info"
                    onClick={this.jumpToAdditionalInfo}>
                    <span className="agency-recipient__awarding-icon">
                        <Icons.ArrowDown />
                    </span>
                    View additional information
                </button>
            </div>
        );
        return (
            <AwardSection type="column" className="agency-recipient">
                <div className="agency-recipient__wrapper">
                    <div className="agency-recipient__awarding">
                        <div className="agency-recipient__title">Awarding Agency</div>
                        <div className="agency-recipient__detail">
                            <a href={`/#/agency/${this.props.awardingAgency.id}`}>
                                {this.props.awardingAgency.formattedToptier}
                            </a>
                        </div>
                    </div>
                    <div className="agency-recipient__recipient">
                        <div className="agency-recipient__title">Recipient</div>
                        <div className="agency-recipient__detail">
                            {this.formatRecipientLink(this.props.recipient.internalId, this.props.recipient.name)}
                        </div>
                    </div>
                </div>
                {additionalInfoLink}
            </AwardSection>
        );
    }
}
AgencyRecipient.propTypes = propTypes;
