/**
 * Licensing.jsx
 * Created by Joanthan Hill 07/22/19
 */

import React, { Component } from 'react';
import { showRedirectModal } from 'helpers/redirectHelper';

export default class Licensing extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        showRedirectModal('https://github.com/fedspendingtransparency');
    }
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-licensing">
                <h2 className="about-section-title">
                    Licensing
                </h2>
                <div className="about-section-content">
                    <p>
                        The U.S. Department of the Treasury, Bureau of the Fiscal
                        Service is committed to providing open data to enable effective
                        tracking of federal spending.  The data on this site is available
                        to copy, adapt, redistribute, or otherwise use for non-commercial
                        or for commercial purposes, subject to the Limitation on Permissible
                        Use of Dun &amp; Bradstreet, Inc. Data&nbsp;
                        <a
                            href="/#/db_info">
                            noted on the homepage
                        </a>.
                    </p>
                    <p>
                        The code in our&nbsp;
                        <button
                            className="usa-button-link"
                            role="link"
                            onClick={this.onClick}>
                            public github repository&nbsp;
                        </button>
                        is
                        available for public use under the Creative
                        Commons CC0 Public Domain Dedication license.
                    </p>
                </div>
            </div>
        );
    }
}
