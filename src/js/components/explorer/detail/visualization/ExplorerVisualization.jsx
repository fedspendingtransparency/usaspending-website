/**
 * ExplorerVisualization.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleDown, AngleUp, InfoCircle, Building } from 'components/sharedComponents/icons/Icons';

export default class ExplorerVisualization extends React.Component {
    render() {
        return (
            <div className="explorer-visualization-wrapper">
                <div className="toolbar">
                    <div className="breakdown-menu">
                        <div className="breakdown-label">
                            See the breakdown by:
                        </div>
                        <div className="breakdown-dropdown">
                            <button className="dropdown-selector">
                                <div className="item-icon">
                                    <Building />
                                </div>
                                <div className="item-label">
                                    Agency
                                </div>
                                <div className="arrow">
                                    <AngleDown />
                                </div>
                            </button>
                        </div>
                        
                    </div>
                    <div className="instructions">
                        <div className="icon">
                            <InfoCircle />
                        </div>
                        <div className="label">
                            View Instructions
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}