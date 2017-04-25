/**
 * Overview.jsx
 * Created by Destin Frasier 03/30/2017
 **/

import React from 'react';

export default class MastHead extends React.Component {

    render() {
        return (
            <div className="overview-wrap">
                <div className="overview-header">
                    <h3>Background</h3>
                    <hr className="results-divider" />
                </div>
                <div className="overview-inner-wrap-left">
                    <h5>Source of Data</h5>
                    <p>The U.S Treasury Department brings together data from hundreds of federal agencies and systems to make it readily available to the public. Federal agencies report this data, in a standard format, to Treasury and other government-wide systems.</p>
                    <a href="#/sourcesofdata">
                        <button
                            className="usa-button-primary"
                            title="View the Policy"
                            aria-label="View the Policy">
                            View the Policy
                        </button>
                    </a>
                </div>
                <div className="overview-inner-wrap-right">
                    <h5>Relevant Legislature</h5>
                    <p>In 2014, Congress passed the Digital Accountability and Transparency Act (DATA Act) in order to enable taxpayers and policy makers to track Federal spending more effectively. </p>
                     <a href="#/relevantlegislature">
                        <button
                            className="usa-button-primary"
                            title="View Relevant Legislature"
                            aria-label="View Relevant Legislature">
                            View Relevant Legislature
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}
