/**
 * ShownAwardID.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from '../otherFilters/ShownValue';

const propTypes = {
    toggleAwardID: PropTypes.func,
    label: PropTypes.string
};

const ShownAwardID = (props) => {
    const { toggleAwardID, label } = props;

    return (
        <ShownValue label={label} removeValue={toggleAwardID} />
    );
};

ShownAwardID.propTypes = propTypes;
export default ShownAwardID;
