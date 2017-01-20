/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';

export default class AgencyInfo extends React.Component {

    render() {
        return (
            <div className="agency-info">
                <select className="agency-option">
                    <option>Awarding Agency</option>
                    <option>Funding Agency</option>
                </select>
                <div className="agency-name">
                    Department of Defense
                </div>
                <ul className="agency-subtiers">
                    <li className="subtier-agency">
                        <div className="subtier title">
                            Awarding Subtier Agency
                        </div>
                        <div className="subtier name">
                            Department of the Navy
                        </div>
                    </li>
                    <li className="office-agency">
                        <div className="office title">
                            Awarding Office
                        </div>
                        <div className="office name">
                            Naval Air Systems Command
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
