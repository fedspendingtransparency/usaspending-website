/**
 * VisualizationTabItem.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    clickedTab: PropTypes.func,
    code: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string
};

const VisualizationTabItem = (props) => {
    const clickedTab = () => {
        props.clickedTab(props.code);
    };

    const Icon = Icons[props.icon];
    let active = '';
    if (props.active) {
        active = 'active';
    }

    return (
        <li>
            <button
                className={`visualization-type-tab ${active}`}
                aria-label={props.label}
                role="menuitemradio"
                aria-checked={props.active}
                title={props.label}
                onClick={clickedTab}
                disabled={props.disabled}
                id={props.id}>
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

VisualizationTabItem.propTypes = propTypes;

export default VisualizationTabItem;
