/**
 * AgencyRecipient.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

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
    render() {
        let additionalInfoLink = null;
        if (this.props.category === 'contract' || this.props.category === 'idv') {
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
        }
        return (
            <div className="award__col agency-recipient">
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
                            <a href={`/#/recipient/${this.props.recipient.internalId}`}>
                                {this.props.recipient.name}
                            </a>
                        </div>
                    </div>
                </div>
                {additionalInfoLink}
            </div>
        );
    }
}
AgencyRecipient.propTypes = propTypes;
