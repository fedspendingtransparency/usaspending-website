/**
 * SummaryBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import * as Icons from '../sharedComponents/icons/Icons';

export default class SummaryBar extends React.Component {

    render() {
        return (
            <div className="usa-da-summary-bar">
                <div className="summary-bar-wrap">
                    <h1 className="summary-title">Contract Summary</h1>
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            <li>
                                <div className="format-item">
                                    <div className="item-label">Award ID</div>
                                    <div className="item-value">34290832094832</div>
                                </div>
                            </li>
                            <li>
                                <div className="format-item">
                                    <div className="item-label">Parent Award ID</div>
                                    <div className="item-value">30952833059283</div>
                                </div>
                            </li>
                            <li>
                                <div className="format-item">
                                    <div className="item-label">Status</div>
                                    <div className="item-value">IN PROGRESS</div>
                                </div>
                            </li>
                            <li>
                                <div className="format-item">
                                    <Icons.MoreOptions />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
