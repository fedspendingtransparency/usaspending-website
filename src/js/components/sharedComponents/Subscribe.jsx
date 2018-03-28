/**
 * Subscribe.jsx
 * Created by Lizzie Salita 3/27/18
 **/

import React from 'react';
import { Envelope, CaratRight } from 'components/sharedComponents/icons/Icons';

export default class Subscribe extends React.Component {
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
                    href="mailto:join-usaspending@lists.fiscal.treasury.gov">
                    Sign Up
                    <CaratRight />
                </a>
            </div>
        );
    }
}
