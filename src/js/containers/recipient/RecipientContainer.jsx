/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useNavigate, useMatch } from 'react-router';

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import * as recipientActions from 'redux/actions/recipient/recipientActions';
import * as RecipientHelper from 'helpers/recipientHelper';
import { isFyValid } from 'helpers/fiscalYearHelper';

import RecipientPage from 'components/recipient/RecipientPage';

require('pages/recipient/recipientPage.scss');

const defaultFy = 'latest';

const propTypes = {
    setRecipientOverview: PropTypes.func,
    setRecipientFiscalYear: PropTypes.func,
    resetRecipient: PropTypes.func,
    recipient: PropTypes.object
};

const RecipientContainer = (props) => {
    const history = useNavigate();
    const match = useMatch(`/recipient/:recipientId/:fy?`);
    const { recipientId, fy } = match.params;
    const [state, setState] = useState({
        loading: true,
        error: false
    });

    const parseRecipient = (data) => {
        const recipientOverview = Object.create(BaseRecipientOverview);
        recipientOverview.populate(data);
        props.setRecipientOverview(recipientOverview);
    };

    const loadRecipientOverview = useCallback((id, year) => {
        let request;

        if (request) {
            // A request is currently in-flight, cancel it
            request.cancel();
        }

        request = RecipientHelper.fetchRecipientOverview(id, year);

        request.promise
            .then((res) => {
                setState({
                    loading: false,
                    error: false
                });
                parseRecipient(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);

                    setState({
                        loading: false,
                        error: true
                    });
                }
            });
    });

    const updateSelectedFy = (newFy) => {
        history(`/recipient/${props.recipient.id}/${newFy}`);
        props.setRecipientFiscalYear(newFy);
    };

    useEffect(() => {
        if (fy) {
            if ([defaultFy, 'all'].includes(fy) || isFyValid(fy)) {
                props.setRecipientFiscalYear(fy);
                loadRecipientOverview(recipientId, props.recipient.fy);
            }
            else {
                history(`/recipient/${recipientId}/${defaultFy}`, { replace: true });

                props.setRecipientFiscalYear(defaultFy);
                loadRecipientOverview(recipientId, defaultFy);
            }
        }
        else {
            history(`/recipient/${recipientId}/${defaultFy}`, { replace: true });
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        // Reset the FY
        props.setRecipientFiscalYear(defaultFy);
        props.resetRecipient();

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        props.setRecipientFiscalYear(fy);
        loadRecipientOverview(recipientId, defaultFy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipientId]);

    useEffect(() => {
        props.setRecipientFiscalYear(fy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fy]);

    useEffect(() => {
        loadRecipientOverview(recipientId, props.recipient.fy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.recipient.fy]);

    return (
        <RecipientPage
            loading={state.loading}
            error={state.error}
            id={props.recipient.id}
            recipient={props.recipient}
            pickedFy={updateSelectedFy} />
    );
};

RecipientContainer.propTypes = propTypes;
export default connect(
    (state) => ({
        recipient: state.recipient
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientContainer);
