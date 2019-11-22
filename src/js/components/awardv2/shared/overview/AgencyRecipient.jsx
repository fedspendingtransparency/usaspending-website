/**
 * AgencyRecipient.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AwardSection from '../AwardSection';

const propTypes = {
    awardingAgency: PropTypes.object,
    recipient: PropTypes.object
};

export default class AgencyRecipient extends React.Component {
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
        return (
            <AwardSection type="column" className="agency-recipient">
                <div className="agency-recipient__wrapper">
                    <div className="agency-recipient__awarding">
                        <h6 className="award-overview-title">Awarding Agency</h6>
                        <div className="agency-recipient__detail">
                            <a href={`/#/agency/${this.props.awardingAgency.id}`}>
                                {this.props.awardingAgency.formattedToptier}
                            </a>
                        </div>
                    </div>
                    <div className="agency-recipient__recipient">
                        <h6 className="award-overview-title">Recipient</h6>
                        <div className="agency-recipient__detail">
                            {this.formatRecipientLink(this.props.recipient.internalId, this.props.recipient.name)}
                        </div>
                    </div>
                </div>
            </AwardSection>
        );
    }
}
AgencyRecipient.propTypes = propTypes;
