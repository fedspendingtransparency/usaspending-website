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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam dapibus rutrum.
                     Duis ultricies dolor ut lacus cursus venenatis. Phasellus a accumsan ipsum, non cursus orci.
                     Vestibulum aliquam est eget nisl faucibus ullamcorper.</p>
                    <a href="#">
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam dapibus rutrum.
                     Duis ultricies dolor ut lacus cursus venenatis. Phasellus a accumsan ipsum, non cursus orci.
                     Vestibulum aliquam est eget nisl faucibus ullamcorper.</p>
                </div>
            </div>
        );
    }
}
