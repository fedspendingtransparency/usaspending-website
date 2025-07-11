/**
 * Note.jsx
 * Created by Jonathan Hill 07/09/19
 **/

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    title: PropTypes.string,
    message: oneOfType([PropTypes.string, PropTypes.element])
};

const Note = ({ title, message }) => (
    <p className="default-note">
        <strong>{title || 'NOTE:'}</strong>&nbsp;
        {message}
    </p>
);

Note.propTypes = propTypes;
export default Note;

export const dodNote = (
    <>
        There is a 90-day delay in displaying contract award data, subcontract data,
        and Account Breakdown by Award (File C) data for the Department of Defense (DOD).
        For more information, visit our <Link to="/about?section=data-quality">About Page</Link>.
    </>
);
