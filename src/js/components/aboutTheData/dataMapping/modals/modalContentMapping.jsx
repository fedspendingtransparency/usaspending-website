import React from 'react';
import PublicationDatesContainer from 'containers/aboutTheData/modals/PublicationDatesContainer';
import MissingAccountBalanceContainer from 'containers/aboutTheData/modals/MissingAccountBalanceContainer';

export const modalContentMapping = (data) => ({
    publicationDates: (<PublicationDatesContainer {...data} />),
    missingAccountBalance: (<MissingAccountBalanceContainer {...data} />)
});
