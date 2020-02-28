import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { fetchAwardTransaction } from 'helpers/searchHelper';

const propTypes = {
    awardId: PropTypes.string
};

const ContractGrantActivityContainer = ({ awardId }) => {
    const [loading, setLoading] = useState(false);
    const [transactions, updateTransactions] = useState([]);
    const [error, updateError] = useState({ error: false, message: '' });
    const request = useRef(null);
    // Get all transactions ascending
    const getTransactions = useCallback(() => {
        const asyncFunc = async () => {
            if (request.current) request.cancel();
            setLoading(true);
            const params = {
                award_id: awardId,
                page: 1,
                sort: 'federal_action_obligation',
                order: 'asc',
                limit: 100
            };
            let hasNext = true;
            // generator
            async function* paginateTransactions() {
                while (hasNext) {
                    try {
                        request.current = fetchAwardTransaction(params);
                        const response = await request.current.promise;
                        console.log(' Response : ', response);
                        params.page++;
                        hasNext = response.data.page_metadata.hasNext;
                        yield response.data;
                    }
                    catch (e) {
                        updateError({ error: true, message: e.message });
                    }
                }
                return null;
            }
            // use the iterator
            const getAllTransactions = async () => {
                const data = [];
                const iterator = paginateTransactions();
                for await (const transaction of iterator) {
                    data.push(...transaction.results);
                }
                return data;
            };
            const allTransactions = await getAllTransactions();
            console.log(' All Transactions : ', allTransactions);
            updateTransactions(allTransactions);
        };
        asyncFunc();
    }, [awardId]);

    useEffect(() => getTransactions(), [getTransactions, awardId]);

    return <div>hi</div>;
};

ContractGrantActivityContainer.propTypes = propTypes;

export default ContractGrantActivityContainer;
