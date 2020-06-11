/**
 * DateNote.jsx
 * Created by Jonathan Hill 06/10/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = { dateString: PropTypes.string };

const DateNote = ({ dateString }) => (
    <div className="covid__date-note">
        Data as of {dateString}
    </div>
);

DateNote.propTypes = propTypes;
export default DateNote;
