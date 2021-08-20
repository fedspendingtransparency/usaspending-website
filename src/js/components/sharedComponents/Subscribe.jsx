/**
 * Subscribe.jsx
 * Created by Lizzie Salita 3/27/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { Envelope, CaretRight } from 'components/sharedComponents/icons/Icons';

export default class Subscribe extends React.Component {
    static propTypes = {
        pageName: PropTypes.string.isRequired
    }

    trackLink = () => Analytics.event({
        category: this.props.pageName,
        action: 'Link',
        label: 'sign-up'
    });

    render() {
        return (
            <div className="subscribe">
                <div className="subscribe__icon">
                    <Envelope />
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
                    <CaretRight />
                </a>
            </div>
        );
    }
}
