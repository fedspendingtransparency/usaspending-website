/**
 * RecipientDistributionContainer.jsx
 * Created by Lizzie Salita 7/1/21
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isCancel } from 'axios';

import { LoadingMessage, ErrorMessage } from 'data-transparency-ui';
import { fetchRecipientDistribution } from 'apis/agencyV2';
import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';
import { setAgencyRecipients, resetAgencyRecipients } from 'redux/actions/agencyV2/agencyV2Actions';
import RecipientDistribution from 'components/agencyV2/visualizations/RecipientDistribution';

const propTypes = {
    fiscalYear: PropTypes.string.isRequired,
    data: PropTypes.object
};

const RecipientDistributionContainer = ({ fiscalYear, data }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const request = React.useRef(null);
    const { toptierCode } = useSelector((state) => state.agencyV2.overview);
    const dispatch = useDispatch();

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        dispatch(resetAgencyRecipients());
    }, [dispatch]);

    const getRecipientDistribution = () => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        request.current = fetchRecipientDistribution(
            toptierCode,
            fiscalYear
        );
        request.current.promise
            .then((res) => {
                const recipientDistribution = Object.create(BaseAgencyRecipients);
                recipientDistribution.populate(res.data);
                dispatch(setAgencyRecipients(recipientDistribution));
                setLoading(false);
                request.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.error(e);
                    setError(true);
                    setLoading(false);
                    request.current = null;
                }
            });
    };

    useEffect(() => {
        if (toptierCode) {
            getRecipientDistribution();
        }
    }, [fiscalYear, getRecipientDistribution, toptierCode]);

    return (
        <div className="recipient-distribution-visualization-container">
            {loading && <LoadingMessage />}
            {error && <ErrorMessage />}
            {!loading && !error && (
                <RecipientDistribution data={data} />
            )}
        </div>
    );
};

RecipientDistributionContainer.propTypes = propTypes;
export default RecipientDistributionContainer;
