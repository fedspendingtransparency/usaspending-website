/**
 * RecipientLandingContainer.jsx
 * Created by David Trinh 7/2/18
 */

import React, { useState, useRef, useEffect } from 'react';
import { isCancel } from 'axios';
import { inRange } from 'lodash-es';

import * as RecipientLandingHelper from 'helpers/recipientLandingHelper';
import RecipientLandingContent from 'components/recipientLanding/RecipientLandingContent';
import BaseRecipientLandingRow from 'models/v2/recipient/BaseRecipientLandingRow';

const RecipientLandingContainer = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [order, setOrder] = useState({ field: 'amount', direction: 'desc' });
    const [awardType, setAwardType] = useState('all');
    const [inFlight, setInFlight] = useState(false);
    const [error, setError] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize] = useState(50);

    const recipientsRequest = useRef(null);

    const onChangePage = (page) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (inRange(page, 1, totalPages + 1)) {
            // Change page number in the state and make a new request
            setPageNumber(pageNumber);
        }
    };

    const setRecipientSearchString = (string) => {
        setSearchString(string);
        setPageNumber(1);
    };

    const setSort = (field, direction) => {
        setOrder({ field, direction });
        setPageNumber(1);
    };

    const setTab = (awardType) => {
        setAwardType(awardType);
        setPageNumber(1);
    };

    const parseRecipients = (data) => {
        const recipients = [];

        data.results.forEach((item) => {
            const recipient = Object.create(BaseRecipientLandingRow);
            recipient.populate(item);
            if (recipient.duns !== 'DUNS not provided' || recipient.name !== 'Not provided in source system') {
                recipients.push(recipient);
            }
        });

        setTotalItems(data.page_metadata.total);
        setResults(recipients);
    };

    const fetchRecipients = () => {
        if (recipientsRequest.current) {
            // a request is in-flight, cancel it
            recipientsRequest.current.cancel();
        }

        setInFlight(true);
        setError(false);

        // generate the params
        const params = {
            order: order.direction,
            sort: order.field,
            page: pageNumber,
            limit: pageSize,
            award_type: awardType
        };

        if (searchString !== '') {
            params.keyword = searchString;
        }

        recipientsRequest.current = RecipientLandingHelper.fetchAllRecipients(params);

        recipientsRequest.current.promise
            .then((res) => {
                setInFlight(false);

                parseRecipients(res.data);
            })
            .catch((err) => {
                recipientsRequest.current = null;
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);

                    console.log(err);
                }
            });
    };

    useEffect(() => {
        fetchRecipients();

        return () => recipientsRequest.current.cancel();
    }, [pageNumber, searchString, order, awardType]);

    return (
        <RecipientLandingContent
            results={results}
            inFlight={inFlight}
            error={error}
            order={order}
            setSort={setSort}
            setTab={setTab}
            searchString={searchString}
            setRecipientSearchString={setRecipientSearchString}
            onChangePage={onChangePage}
            pageNumber={pageNumber}
            totalItems={totalItems}
            pageSize={pageSize} />
    );
};

export default RecipientLandingContainer;
