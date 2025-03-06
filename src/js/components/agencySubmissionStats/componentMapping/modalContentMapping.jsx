import React from 'react';
import PublicationDatesContainer from 'containers/agencySubmissionStats/modals/PublicationDatesContainer';
import MissingAccountBalanceContainer from 'containers/agencySubmissionStats/modals/MissingAccountBalanceContainer';
import ReportingDifferencesContainer from 'containers/agencySubmissionStats/modals/ReportingDifferencesContainer';
import UnlinkedDataContainer from 'containers/agencySubmissionStats/modals/UnlinkedDataContainer';

export const modalContentMapping = (data) => ({
    publicationDates: (<PublicationDatesContainer {...data} />),
    missingAccountBalance: (<MissingAccountBalanceContainer {...data} />),
    reportingDifferences: (<ReportingDifferencesContainer {...data} />),
    unlinkedData: (<UnlinkedDataContainer {...data} />)
});
