import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isCancel } from "axios";
import { uniqueId } from "lodash";

import { fetchAwardTransaction } from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

const propTypes = {
    award: PropTypes.object,
    category: PropTypes.string
};

const AwardHistoryTableContainer = ({ award, category }) => {
    const [inFlight, setInFlight] = useState(false);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(false);
    const [sort, setSort] = useState({
        field: 'modification_number',
        direction: 'desc'
    });
    const [error, setError] = useState(false);
    const [tableInstance, setTableInstance] = useState(`${uniqueId()}`);

    let request = null;
    const pageLimit = 5;

    const fetchData = (pageNumber = 1, reset = false) => {
        if (!award.id) {
            return;
        }

        if (request) {
            request.cancel();
        }

        setInFlight(true);
        setError(false);

        const params = {
            award_id: award.id,
            page: pageNumber,
            sort: sort.field,
            order: sort.direction,
            limit: pageLimit
        };

        request = fetchAwardTransaction(params);

        request.promise
            .then((res) => {
                console.log('res: ', res);
            })
            .catch((err) => {
                request = null;
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        fetchData(1, true);

        return () => {
            if (request) {
                request.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);

    useEffect(() => {
        fetchData(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [award.id]);

    return (
        <div>Meowdy</div>
    );
};

AwardHistoryTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardHistoryTableContainer);
