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
                    <span className="overview-coming-soon-text">
                        More coming soon
                    </span>
                </div>
                <div className="overview-inner-wrap-right">
                    <h5>Relevant Legislature</h5>
                    <span className="overview-coming-soon-text">
                        More coming soon
                    </span>
                </div>
            </div>
        );
    }
}
