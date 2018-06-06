/**
 * UnreportedErrorScreen.jsx
 * Created by David Trinh 5/31/18
 */

import React from 'react';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';


export default class UnreportedErrorScreen extends React.Component {
    render() {
        return (
            <div className="explorer-unreported">
                <div className="explorer-unreported__box">
                    <div className="explorer-unreported__top">
                        <div className="explorer-unreported__icon">
                            <InfoCircle alt="Information" />
                        </div>
                        <h3 className="explorer-unreported__header">Data has not been reported at this time.</h3>
                    </div>
                    <div className="explorer-unreported__body">
                        <span className="explorer-unreported__info">This can happen when:</span>
                        <ul className="explorer-unreported__list">
                            <li>An agency reports incomplete data</li>
                            <li>An agency has submission deadline extension, e.g. <a href="https://usaspending-help.zendesk.com/hc/en-us/articles/360001249973-Spending-Explorer-Question-I-m-looking-for-data-from-the-Department-of-Defense-DoD-and-can-t-find-it-is-it-shown-here-">Department of Defense (DOD)</a></li>
                            <li>An agency not required to submit certain data elements</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

