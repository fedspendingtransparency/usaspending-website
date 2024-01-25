/**
 * Subscribe.jsx
 * Created by Lizzie Salita 3/27/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { faCaretRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Subscribe extends React.Component {
    static propTypes = {
        pageName: PropTypes.string.isRequired
    };

    trackLink = () => Analytics.event({
        event: 'stay-in-touch',
        category: this.props.pageName,
        action: 'Link',
        label: 'sign-up'
    });

    render() {
        return (
            <div className="subscribe">
                <div className="subscribe__icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="subscribe__callout">
                    Stay in touch with us!&nbsp;
                </div>
                <div className="subscribe__message">
                    Receive updates on USAspending.gov
                </div>
                <a
                    className="subscribe__link"
                    href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates."
                    onClick={this.trackLink}>
                    Sign Up
                    <FontAwesomeIcon icon={faCaretRight} />
                </a>
            </div>
        );
    }
}
