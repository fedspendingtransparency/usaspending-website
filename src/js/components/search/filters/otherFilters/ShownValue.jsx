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

const ShownValue = ({ removeValue, label }) => (
    <>
        {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
        <div
            className="shown-filter-button"
            value={label}
            aria-label={`Applied filter: ${label}`}
            tabIndex={0} >
            {label}
            <div
                title="Click to remove filter">
                <Button
                    onClick={removeValue}
                    onKeyUp={() => {
                        console.log('here');
                        removeValue();
                    }}
                    buttonSize="sm"
                    buttonType="icon"
                    backgroundColor="light"
                    buttonTitle="close"
                    copy="Click to remove filter."
                    additionalClassnames="shown-filter-button__shown-filter-button-icon"
                    tabIndex={0}
                    image={<FontAwesomeIcon icon="times" style={{ cursor: "pointer" }} tabIndex={-1} />} />
            </div>
        </div>
        {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
    </>
);

ShownValue.propTypes = propTypes;
export default ShownValue;
