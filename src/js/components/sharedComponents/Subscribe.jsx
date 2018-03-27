/**
 * Subscribe.jsx
 * Created by Lizzie Salita 3/27/18
 **/

import React from 'react';

export default class Subscribe extends React.Component {
    render() {
        // TODO - Lizzie: add envelope and arrow SVGs
        return (
            <div className="subscribe">
                <div className="subscribe__icon">
                    envelope
                </div>
                &nbsp;
                <div className="subscribe__message">
                    <span className="subscribe__callout">
                        Stay in touch with us!
                    </span>
                    &nbsp;Receive updates on USAspending.gov&nbsp;
                    <a
                        className="subscribe__link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:join-usaspending@lists.fiscal.treasury.gov">
                        Sign Up
                    </a>
                </div>
            </div>
        );
    }
}
