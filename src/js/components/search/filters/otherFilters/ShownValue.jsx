/**
 * ShownValue.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'data-transparency-ui';

const propTypes = {
    removeValue: PropTypes.func,
    label: PropTypes.string
};

const ShownValue = ({ removeValue, label }) => {
    const keyDownHandler = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className="shown-filter-button"
                value={label}
                aria-label={`Applied filter: ${label}`}
                tabIndex={0}
                onClick={keyDownHandler}
                onKeyDown={keyDownHandler} >
                {label}
                <div title="Click to remove filter">
                    <Button
                        onClick={removeValue}
                        buttonSize="sm"
                        buttonType="icon"
                        backgroundColor="light"
                        buttonTitle="close"
                        copy="Click to remove filter."
                        additionalClassnames="shown-filter-button__shown-filter-button-icon"
                        image={<FontAwesomeIcon icon="times" style={{ cursor: "pointer" }} />} />
                </div>
            </div>
            {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
        </>
    );
};

ShownValue.propTypes = propTypes;
export default ShownValue;
