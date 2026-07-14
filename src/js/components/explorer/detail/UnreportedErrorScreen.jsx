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
                        <h3 className="explorer-unreported__header">Data has not
                            been reported at this time.
                        </h3>
                    </div>
                    <div className="explorer-unreported__body">
                        <span className="explorer-unreported__info">This can happen when:</span>
                        <ul className="explorer-unreported__list">
                            <li>An agency reports no data or incomplete data</li>
                            <li>An agency is late with their submission for this
                                period
                            </li>
                            <li>For FY20 [P07, P08, P10, and P11] and FY21 [P01/P02,
                                P04, P05, P07, P08, P10, and P11], agencies that did
                                not receive COVID-19 supplemental appropriations
                                were not required to submit data on a monthly basis,
                                but only at the end of the quarter. This does not
                                apply in FY22 or later years; starting in FY22, all
                                agencies must submit monthly.
                            </li>
                            <li>New agency submission data updates may still be in
                                progress
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

