/**
 * RecipientLabels.jsx
 * Created by David Trinh 7/11/18
 */

import React from 'react';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import RecipientIcon from './RecipientIcon';

export default class RecipientLabels extends React.Component {
    render() {
        const parentMessage = 'One or more recipients listed this entity as their parent organization';
        // The icon's element id which the tooltip is associated with
        const parentIconPlacement = 'recipient-labels__icon-parent';

        const childMessage = 'test2';
        const childIconPlacement = 'recipient-labels__icon-child';
        return (
            <div className="recipient-labels">
                <div className="recipient-labels-wrapper" id={parentIconPlacement}>
                    <span className="recipient-landing__icon-parent">P</span>
                    <span className="recipient-labels__text">Parent Recipient</span>
                    <RecipientIcon
                        message={parentMessage}
                        placement={parentIconPlacement} />
                </div>
                <div className="recipient-labels-wrapper" id={childIconPlacement}>
                    <span className="recipient-landing__icon-child">C</span>
                    <span className="recipient-labels__text">Child Recipient</span>
                    <RecipientIcon
                        message={childMessage}
                        placement={childIconPlacement} />
                </div>
                <div className="recipient-labels-wrapper">
                    <span className="recipient-landing__icon-recipient">R</span>
                    <div className="recipient-lables_text-wrapper">
                        <span className="recipient-labels__text">Recipient</span>
                        <span>
                            <button
                                className="recipient-labels__icon-info"
                                onFocus={this.showTooltip}
                                onMouseEnter={this.showTooltip}
                                onClick={this.showTooltip}>
                                <InfoCircle alt="Information" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
