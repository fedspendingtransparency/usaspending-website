/**
 * VisualizationTabItem.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';


const VisualizationTabItem = (props) => {
    const Icon = Icons[props.icon];
    let active = '';
    if (props.active) {
        active = 'active';
    }

    return (
        <li>
            <button
                className={`visualization-type-tab ${active}`}
                value={props.code}
                onClick={props.clickedTab}>
                <div className="icon">
                    <Icon alt={props.label} />
                </div>
                <div className="label">
                    {props.label}
                </div>
            </button>
        </li>
    );
};

export default VisualizationTabItem;
