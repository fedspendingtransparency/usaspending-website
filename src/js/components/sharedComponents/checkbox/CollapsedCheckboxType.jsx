/**
 * CollapsedCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import CheckboxExpandButton from './CheckboxExpandButton';

const propTypes = {
    toggleExpand: PropTypes.func,
    toggleChildren: PropTypes.func,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    selected: PropTypes.bool,
    hideArrow: PropTypes.bool,
    arrowState: PropTypes.string,
    isCollapsable: PropTypes.bool
};

const CollapsedCheckboxType = ({
    toggleExpand,
    toggleChildren,
    name = '',
    selected = false,
    hideArrow = true,
    arrowState = 'collapsed',
    isCollapsable = true
}) => {
    const elementId = `checkbox-${uniqueId()}`;
    return (
        <div className="primary-checkbox-type">
            <div className="checkbox-type-item-wrapper">
                {
                    isCollapsable &&
                    <CheckboxExpandButton
                        hidden={hideArrow}
                        toggleExpand={toggleExpand}
                        arrowState={arrowState} />
                }
                <label
                    className="checkbox-item-wrapper"
                    htmlFor={elementId}>
                    <input
                        type="checkbox"
                        id={elementId}
                        value={name}
                        checked={selected}
                        onChange={toggleChildren} />
                    <span className="checkbox-item-label">
                        {name}
                    </span>
                </label>
            </div>
        </div>
    );
};

CollapsedCheckboxType.propTypes = propTypes;

export default CollapsedCheckboxType;
