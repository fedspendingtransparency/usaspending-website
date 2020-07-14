/**
 * DateNote.jsx
 * Created by Jonathan Hill 06/10/2020
 */

import React from 'react';
import { useSelector } from 'react-redux';


const DateNote = () => {
    const date = useSelector((state) => state.covid19.latestSubmissionDate);
    if (!date) return null;
    return (
        <div className="covid__date-note">
            Data as of {date}
        </div>
    );
};

export default DateNote;
