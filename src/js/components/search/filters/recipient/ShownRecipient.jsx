/**
 * ShownRecipient.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from '../otherFilters/ShownValue';

const propTypes = {
    toggleRecipient: PropTypes.func,
    label: PropTypes.string
};

const ShownRecipient = ({ toggleRecipient, label }) => (
    <ShownValue label={label} removeValue={toggleRecipient} />
);

ShownRecipient.propTypes = propTypes;
export default ShownRecipient;
