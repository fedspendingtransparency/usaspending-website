/**
 * Development.jsx
 * Created by Lizzie Salita 7/10/19
 */

import React from 'react';

import * as redirectHelper from 'helpers/redirectHelper';

export default class Development extends React.Component {
    constructor(props) {
        super(props);

        this.clickedLink = this.clickedLink.bind(this);
    }

    clickedLink() {
        redirectHelper.showRedirectModal('https://github.com/fedspendingtransparency/usaspending-website/wiki');
    }
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-development">
                <h2 className="about-section-title">
                    Development and Release Notes
                </h2>
                <div className="about-section-content">
                    <p>
                        USAspending is developed using agile methods. Our current release approach begins with a two-week development sprint, followed by a two-week testing period (concurrent with the subsequent development sprint). As such, about four weeks pass between the start of a sprint and its updates reaching production; however, because we concurrently test the previous sprint while developing the next sprint, the end result is still website updates roughly every two weeks. If you would like to receive regular release notes via e-mail, please&nbsp;
                        <a
                            href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.">
                            sign up here
                        </a>. We maintain a collection of all previous release notes&nbsp;
                        <button
                            className="usa-button-link"
                            role="link"
                            onClick={this.clickedLink}>
                            here
                        </button>.
                    </p>
                </div>
            </div>
        );
    }
}
