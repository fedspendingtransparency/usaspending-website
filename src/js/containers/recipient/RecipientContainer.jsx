/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useHistory } from 'react-router-dom';

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import * as recipientActions from 'redux/actions/recipient/recipientActions';
import * as RecipientHelper from 'helpers/recipientHelper';
import { isFyValid } from 'helpers/fiscalYearHelper';

import RecipientPage from 'components/recipient/RecipientPage';
import { usePrevious } from "../../helpers";

require('pages/recipient/recipientPage.scss');

const defaultFy = 'latest';

const propTypes = {
    setRecipientOverview: PropTypes.func,
    setRecipientFiscalYear: PropTypes.func,
    resetRecipient: PropTypes.func,
    recipient: PropTypes.object,
    match: PropTypes.object
};

const RecipientContainer = (props) => {
    const prevProps = usePrevious(props);
    const history = useHistory();
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

    const updateSelectedFy = (fy) => {
        history.push(`/recipient/${props.recipient.id}/${fy}`);
        props.setRecipientFiscalYear(fy);
    };

    useEffect(() => {
        const params = props.match.params;
        if (Object.keys(params).includes('fy')) {
            if ([defaultFy, 'all'].includes(params.fy) || isFyValid(params.fy)) {
                props.setRecipientFiscalYear(params.fy);
                loadRecipientOverview(params.recipientId, props.recipient.fy);
            }
            else {
                history.replace(`/recipient/${props.match.params.recipientId}/${defaultFy}`);
                props.setRecipientFiscalYear(defaultFy);
                loadRecipientOverview(params.recipientId, defaultFy);
            }
        }
        else {
            history.replace(`/recipient/${props.match.params.recipientId}/${defaultFy}`);
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
        if (prevProps) {
            if (props.match.params.recipientId !== prevProps.match.params.recipientId) {
                // Reset the FY
                props.setRecipientFiscalYear(props.match.params.fy);
                loadRecipientOverview(props.match.params.recipientId, defaultFy);
            }
            if (prevProps.match.params.fy !== props.match.params.fy) {
                props.setRecipientFiscalYear(props.match.params.fy);
            }
            if (props.recipient.fy !== prevProps.recipient.fy) {
                loadRecipientOverview(props.match.params.recipientId, props.recipient.fy);
            }
        }
    });

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
