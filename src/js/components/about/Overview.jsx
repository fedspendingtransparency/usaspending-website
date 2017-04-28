/**
 * Overview.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';

export default class Overview extends React.Component {

    render() {
        return (
            <div className="overview-wrap">
                <div className="overview-header">
                    <h3>Background</h3>
                    <hr className="results-divider" />
                </div>
                <div className="overview-inner-wrap-left">
                    <h5>Source of Data</h5>
                    <p>
                        The U.S Treasury Department brings together data from hundreds of federal
                        agencies and systems to make federal spending data readily available to the
                        public. Read more about how the data arrives in our system.
                    </p>
                    <a href="#/sourcesofdata">
                        <button
                            className="usa-button-primary"
                            title="View the Policy"
                            aria-label="View the Policy">
                        Learn More
                        </button>
                    </a>
                </div>
                <div className="overview-inner-wrap-right">
                    <h5>Relevant Legislature</h5>
                    <p>
                        Two major pieces of legislation (FFATA and the DATA Act) have paved the way
                        for more accessible, reliable, and transparent federal spending data. Read
                        more about these landmark legislations and their impact.
                    </p>
                    <a href="#/relevantlegislature">
                        <button
                            className="usa-button-primary"
                            title="View the Relevant Legislature"
                            aria-label="View the Relevant Legislature">
                                View the Relevant Legislature
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}
