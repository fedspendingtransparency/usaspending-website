import React from 'react';
import PropTypes from 'prop-types';
import PrimaryCheckboxType from "./PrimaryCheckboxType";

const propTypes = {
    filters: PropTypes.array
};

const defaultProps = {
    filters: []
};

const NewCheckbox = (props) => (
    <PrimaryCheckboxType filters={props.filters} />
);

NewCheckbox.propTypes = propTypes;
NewCheckbox.defaultProps = defaultProps;

export default NewCheckbox;
