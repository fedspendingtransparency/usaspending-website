/**
 * CheckboxExpandButton.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../icons/Icons';

const propTypes = {
    hidden: PropTypes.bool,
    toggleExpand: PropTypes.func,
    arrowState: PropTypes.string
};

const CheckboxExpandButton = ({
    hidden = false,
    toggleExpand,
    arrowState
}) => {
    let hiddenClass = '';
    let icon = <Icons.AngleRight />;

    if (hidden) {
        hiddenClass = 'hidden-button';
    }


    if (arrowState === 'expanded') {
        icon = <Icons.AngleDown />;
    }

    const clickedButton = () => {
        if (hidden) {
            // button is disabled
            return;
        }
        toggleExpand();
    };

    return (
        <button
            className={`toggle ${hiddenClass}`}
            onClick={clickedButton}
            title="child filters"
            disabled={hidden}
            aria-expanded={arrowState === 'expanded'}>
            {icon}
        </button>
    );
};

CheckboxExpandButton.propTypes = propTypes;
export default CheckboxExpandButton;
