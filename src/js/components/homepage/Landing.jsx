/**
 * Landing.jsx
 * Created by Destin Frasier 03/17/2017
 **/

import React from 'react';

export default class Landing extends React.Component {

    render() {
        return (
            <div className="landingSectionWrap">
                <div className="contentWrap">
                    <h2>In 2016, the U.S. government spent <span className="stronger">$3.85 Trillion Dollars</span></h2>
                    <h5>How was that money used? We have the answers.</h5>
                    <ul className="buttonsWrap">
                        <li>See the Breakdown.</li>
                        <li>Begin Your Search.</li>
                    </ul>
                </div>
            </div>
        );
    }
}
