import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { fetchAwardTransaction } from 'helpers/searchHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';
import ContractGrantActivity from 'components/award/shared/activity/ContractGrantActivity';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipWrapper } from 'data-transparency-ui';
import {
    contractActivityGrants,
    contractActivityInfoContracts
} from 'components/award/shared/InfoTooltipContent';

const propTypes = {
    awardId: PropTypes.string,
    awardType: PropTypes.string
};

const ContractGrantActivityContainer = ({ awardId, awardType }) => {
    // loading
    const [loading, setLoading] = useState(false);
    // transactions
    const [transactions, updateTransactions] = useState([]);
    // errors
    const [error, updateError] = useState({ error: false, message: '' });
    // requests
    const request = useRef(null);
    /**
     * formatTransactions
     * - any transactions that have the same date must be summed into one amount.
     * We need to keep all transactions with the same date for the paginating tooltips.
     * @param {Object[]} - an array of all transaction objects for this award.
     * @returns {Object[]} - an array of all transaction objects for this award.
     */
    const formatTransactions = (rawTransactions) => {
        // Reduce into unique transaction objects
        console.log(' Start : ', Date.now());
        const newData = rawTransactions.reduce((acc, data) => {
            const currentTransactionIndex = acc.findIndex((x) => x.action_date === data.action_date);
            /**
             * When we have multiple transactions on the same day, we will sum their obligation and
             * we will keep track of all the transactions on the same date for the tooltips in the
             * allTransactions property.
             */
            if (currentTransactionIndex !== -1) {
                // update the allTransactions array if it exists
                if (acc[currentTransactionIndex]?.allTransactions) {
                    acc[currentTransactionIndex].allTransactions.push(data);
                }
                else {
                    /**
                     * The first duplicate found.
                     * We will add the duplicate which is this data, and we will add the
                     * original node which is acc[currentTransactionIndex].
                     */
                    acc[currentTransactionIndex].allTransactions = [acc[currentTransactionIndex], data];
                }
                /**
                 * We sum the obligation last since we will want to keep the original obligation
                 * value if we add it to the allTransactions array.
                 */
                const sumOfObligations = acc[currentTransactionIndex].federal_action_obligation + data.federal_action_obligation;
                acc[currentTransactionIndex].federal_action_obligation = sumOfObligations;
                return acc;
            }
            acc.push(data);
            return acc;
        }, []);
        console.log(' End : ', Date.now());
        console.log(' New Data : ', newData);
        return newData;
    };
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
            /**
             * paginateTransactions
             * - Generator function that fetches transactions
             * @returns {Object[]} - an array of one page of transactions
             */
            async function* paginateTransactions() {
                while (hasNext) {
                    try {
                        request.current = fetchAwardTransaction(params);
                        const response = await request.current.promise;
                        params.page++;
                        hasNext = response.data.page_metadata.hasNext;
                        yield response.data;
                    }
                    catch (e) {
                        hasNext = false;
                        updateError({ error: true, message: e.message });
                    }
                }
                return null;
            }
            /**
             * getAllTransactions
             * - Iterator that iterates through all transactions
             * @returns {Object[]} - an array of all transactions
             */
            const getAllTransactions = async () => {
                const data = [];
                const iterator = paginateTransactions();
                for await (const transaction of iterator) {
                    data.push(...transaction.results);
                }
                return data;
            };
            /**
             * allTransactions
             * - executes getAllTransactions
             * @returns {Object[]} - an array of all transactions
             */
            const allTransactions = await getAllTransactions();
            console.log(' All Transactions : ', allTransactions);
            updateTransactions(formatTransactions(allTransactions));
            setLoading(false);
        };
        asyncFunc();
    }, [awardId]);

    useEffect(() => getTransactions(), [getTransactions, awardId]);
    /**
     * title
     * - updates title based on award type
     * @returns {String} - '[Grants || Contract] Activity'
     */
    const title = () => (awardType === 'grants' ? 'Grants Activity' : 'Contract Activity');
    /**
     * message
     * - updates the message displayed to users based on error, loading, and
     * transactions state properties
     * @returns {Component} - respective error, loading or no results component
     */
    const message = () => {
        if (error.error) return <ResultsTableErrorMessage />;
        if (loading) return <ResultsTableLoadingMessage />;
        if (!transactions.length) return <NoResultsMessage />;
        return null;
    };
    /**
     * content
     * - displays content if there is data
     * @returns {Component} - ContractGrantsActivity
     */
    const content = () => {
        if (
            !error.error
            && !loading
            && transactions.length > 0
        ) {
            return <ContractGrantActivity />;
        }
        return null;
    };
    /**
     * tooltip info
     * - updates the tooltip data based on award type
     * @return {Component} - respective tooltip data
     */
    const tooltipInfo = () => {
        if (awardType === 'grants') return contractActivityGrants;
        return contractActivityInfoContracts;
    };

    return (
        <div className="award__col award-viz contract-grant-activity">
            <div className="award__col__content">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <FontAwesomeIcon size="lg" icon="chart-area" />
                    </div>
                    <h3 className="award-viz__title">{title()}</h3>
                    <TooltipWrapper
                        className="award-section-tt"
                        icon="info"
                        wide
                        tooltipComponent={tooltipInfo()} />
                </div>
                <hr />
                <div className="results-table-message-container">
                    {message()}
                </div>
                {content()}
            </div>
        </div>
    );
};

ContractGrantActivityContainer.propTypes = propTypes;

export default ContractGrantActivityContainer;
