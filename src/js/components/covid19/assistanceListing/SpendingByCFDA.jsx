/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React, { useState } from 'react';
import RedirectModal from 'components/sharedComponents/RedirectModal';
import SummaryInsightsContainer from 'containers/covid19/assistanceListing/SummaryInsightsContainer';
import SpendingByCFDAContainer from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';

const SpendingByCFDA = () => {
    const [isRedirectModalMounted, setIsRedirectModalMounted] = useState(false);
    const [redirectModalURL, setRedirectModalURL] = useState('');

    const onRedirectModalClick = (e) => {
        setRedirectModalURL(e.currentTarget.value);
        setIsRedirectModalMounted(true);
    };

    const closeRedirectModal = () => {
        setRedirectModalURL('');
        setIsRedirectModalMounted(false);
    };

    return (
        <div className="body__content assistance-listing">
            <h3 className="body__narrative">
                These are the assistance listings that supported the COVID-19 Response with <strong>awards</strong>.
            </h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <SummaryInsightsContainer />
            <SpendingByCFDAContainer onRedirectModalClick={onRedirectModalClick} />
            <RedirectModal
                mounted={isRedirectModalMounted}
                hideModal={closeRedirectModal}
                url={redirectModalURL} />
        </div>
    );
};

export default SpendingByCFDA;
