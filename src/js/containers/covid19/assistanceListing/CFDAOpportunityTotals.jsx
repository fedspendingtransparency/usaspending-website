/**
 * CFDAOpportunityTotals.jsx
 * Created By Jonathan Hill 08/31/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { fetchOpportunityTotals } from 'helpers/covid19Helper';

const propTypes = {
    code: PropTypes.string
};

const CFDAOpportunityTotals = ({ code }) => {
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState(null);
    const [error, setError] = useState({ error: false, message: '' });
    const apiRequest = useRef(null);
    useEffect(() => {
        apiRequest.current = fetchOpportunityTotals(code);
        const asyncFunc = async () => {
            try {
                const response = await apiRequest.current.promise;
                if (response.status === 204) {
                    setError({ error: true, message: 'Note: there are no current or archived listings for this CFDA on Grants.gov at this time.' });
                }
                else {
                    const { data } = response;
                    setTotals(data);
                }
                setLoading(false);
            }
            catch (e) {
                if (!isCancel(e)) {
                    if (e.response.status === 503) {
                        setError({ error: true, message: 'CFDA source data is not available at this time.' });
                    }
                    else {
                        setError({ error: true, message: e.message });
                    }
                    setLoading(false);
                }
            }
        };
        asyncFunc();
        return () => {
            if (apiRequest.current) apiRequest.current.cancel();
        };
    }, [code]);

    return (
        <div className="cfda-opportunities__container">
            {!error.error &&
            <div className="cfda-opportunities__totals">
                <div className="cfda-opportunities__total">
                    <div className="cfda-opportunities__total__title">Open</div>
                    <div className="cfda-opportunities__total__count">
                        {loading && <div className="dot-pulse" />}
                        {!loading && totals.posted}
                    </div>
                </div>
                <div className="cfda-opportunities__total">
                    <div className="cfda-opportunities__total__title">Closed</div>
                    <div className="cfda-opportunities__total__count">
                        {loading && <div className="dot-pulse" />}
                        {!loading && totals.closed}
                    </div>
                </div>
                <div className="cfda-opportunities__total">
                    <div className="cfda-opportunities__total__title">Archived</div>
                    <div className="cfda-opportunities__total__count">
                        {loading && <div className="dot-pulse" />}
                        {!loading && totals.archived}
                    </div>
                </div>
                <div className="cfda-opportunities__total">
                    <div className="cfda-opportunities__total__title">Forecasted</div>
                    <div className="cfda-opportunities__total__count">
                        {loading && <div className="dot-pulse" />}
                        {!loading && totals.forecasted}
                    </div>
                </div>
            </div>
            }
            {error.error && <div>{error.message}</div>}
        </div>
    );
};

CFDAOpportunityTotals.propTypes = propTypes;
export default CFDAOpportunityTotals;
