/**
 * Landing.jsx
 * Created by Destin Frasier 03/17/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';
import ScrollTo from '../sharedComponents/ScrollTo';

export default class Landing extends React.Component {

    render() {
        return (
            <div className="landing-section-wrap">
                <div className="content-wrap">
                    <h2>In 2016, the U.S. government spent <span className="stronger">$3.85 trillion dollars</span></h2>
                    <h5>How was that money used? We have the answers.</h5>
                    <div className="buttons-wrap">
                        <ScrollTo
                            code="breakdown"
                            className="landing-btn"
                            title="See the Breakdown"
                            role="button"
                            label="See the Breakdown"
                            accessibleLabel="See the Breakdown"
                            icon={<Icons.AngleDownCircle className="usa-da-icon-angle-down-circle" />} />

                        <a href="#/search" className="landing-btn" role="button" title="Start Your Search" aria-label="Start Your Search">Start Your Search<Icons.AngleRightCircle className="usa-da-icon-angle-right-circle" /></a>
                    </div>
                </div>
                <div className="bottom-gradient" />
            </div>
        );
    }
}
