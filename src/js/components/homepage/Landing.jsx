/**
 * Landing.jsx
 * Created by Destin Frasier 03/17/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    total: React.PropTypes.string
};

export default class Landing extends React.Component {

    render() {
        return (
            <div className="landing-section-wrap">
                <div className="content-wrap">
                    <h2>In 2016, the U.S. government spent <span className="stronger">
                        {this.props.total} dollars</span></h2>
                    <h5>How was that money used? We have the answers.</h5>
                    <ul className="buttons-wrap">
                        <li>
                            <a href="/#" title="See the Breakdown">
                                See the Breakdown
                                <Icons.AngleDownCircle
                                    className="usa-da-icon-angle-down-circle" />
                            </a>
                        </li>
                        <li>
                            <a href="#/search" title="Start Your Search">
                                Start Your Search
                                <Icons.AngleRightCircle
                                    className="usa-da-icon-angle-right-circle" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="bottom-gradient" />
            </div>
        );
    }
}
Landing.propTypes = propTypes;
