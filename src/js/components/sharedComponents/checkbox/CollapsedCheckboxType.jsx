/**
 * CollapsedCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import CheckboxExpandButton from './CheckboxExpandButton';

const propTypes = {
    toggleExpand: PropTypes.func,
    toggleChildren: PropTypes.func,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    selected: PropTypes.bool,
    hideArrow: PropTypes.bool,
    arrowState: PropTypes.string,
    isCollapsable: PropTypes.bool,
    id: PropTypes.string,
    indeterminate: PropTypes.bool
};

const CollapsedCheckboxType = ({
    toggleExpand,
    toggleChildren,
    name = '',
    selected = false,
    hideArrow = true,
    arrowState = 'collapsed',
    isCollapsable = true,
    id,
    indeterminate
}) => {
    const ref = useRef(null);
    const inputId = `collapsed-checkbox__${id}`;

    if (ref.current) ref.current.indeterminate = indeterminate;

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
                    htmlFor={inputId}>
                    <input
                        type="checkbox"
                        id={inputId}
                        value={name}
                        checked={selected}
                        onChange={toggleChildren}
                        ref={ref} />
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
