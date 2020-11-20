import React from 'react';
import PublicationDatesContainer from 'containers/aboutTheData/modals/PublicationDatesContainer';


export const modalContentMapping = (data) => ({
    publicationDates: (<PublicationDatesContainer {...data} />)
});
