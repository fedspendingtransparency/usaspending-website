/**
 * DateNote.jsx
 * Created by Jonathan Hill 06/10/2020
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { getLatestPeriodAsDayjs } from 'helpers/accountHelper';
import { fetchAllSubmissionDates } from 'apis/account';

const propTypes = {
    styles: PropTypes.object,
    useCache: PropTypes.bool
};

const DateNote = ({ styles, useCache = true }) => {
    const [date, setDate] = useState(null);
    const [error, setError] = useState(false);
    const request = useRef(null);

    const getPeriodEndDate = async () => {
        if (!date) {
            setError(false);
            request.current = fetchAllSubmissionDates(useCache);
            try {
                const { data } = await request.current.promise;
                setDate(getLatestPeriodAsDayjs(data.available_periods));
                request.current = null;
            }
            catch (e) {
                if (!isCancel(e)) {
                    setError(true);
                    console.error(e);
                }
                request.current = null;
            }
        }
    };

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        getPeriodEndDate();
        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, [date]);

    if (error) return null;

    return (
        <div style={{ ...styles }} className="section__date-note">
            Data through {date?.format('M/D/YYYY') || '--'}
        </div>
    );
};

DateNote.propTypes = propTypes;
export default DateNote;
