import React from 'react';
import PublicationDatesContainer from 'containers/aboutTheData/modals/PublicationDatesContainer';
import MissingAccountBalanceContainer from 'containers/aboutTheData/modals/MissingAccountBalanceContainer';
import ReportingDifferencesContainer from 'containers/aboutTheData/modals/ReportingDifferencesContainer';

export const modalContentMapping = (data) => ({
    publicationDates: (<PublicationDatesContainer {...data} />),
    missingAccountBalance: (<MissingAccountBalanceContainer {...data} />),
    reportingDifferences: (<ReportingDifferencesContainer {...data} />)
});
