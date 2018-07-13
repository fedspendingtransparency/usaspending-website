/**
 * RecipientLabels.jsx
 * Created by David Trinh 7/11/18
 */

import React from 'react';
import RecipientInformation from './RecipientInformation';

export default class RecipientLabels extends React.Component {
    render() {
        const parentMessage = 'One or more recipients listed this entity as their parent organization.';
        // The icon's element id which the tooltip is associated with
        const parentIconPlacement = 'recipient-labels__icon-parent';

        const childMessage = 'This recipient has a parent organization listed.';
        const childIconPlacement = 'recipient-labels__icon-child';

        const recipientMessage = 'This recipient does not have a parent organization listed.';
        const recipientIconPlacement = 'recipient-labels__icon-recipient';
        return (
            <div className="recipient-labels">
                <div className="recipient-labels-wrapper" id={parentIconPlacement}>
                    <span className="recipient-landing__icon recipient-landing__icon_parent">P</span>
                    <span className="recipient-labels__text">Parent Recipient</span>
                    <RecipientInformation
                        message={parentMessage}
                        placement={parentIconPlacement} />
                </div>
                <div className="recipient-labels-wrapper" id={childIconPlacement}>
                    <span className="recipient-landing__icon recipient-landing__icon_child">C</span>
                    <span className="recipient-labels__text">Child Recipient</span>
                    <RecipientInformation
                        message={childMessage}
                        placement={childIconPlacement} />
                </div>
                <div className="recipient-labels-wrapper" id={recipientIconPlacement}>
                    <span className="recipient-landing__icon recipient-landing__icon_recipient">R</span>
                    <span className="recipient-labels__text">Recipient</span>
                    <RecipientInformation
                        message={recipientMessage}
                        placement={recipientIconPlacement} />
                </div>
            </div>
        );
    }
}
