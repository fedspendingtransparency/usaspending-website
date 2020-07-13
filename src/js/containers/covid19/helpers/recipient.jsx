/**
 * recipient.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React from 'react';
import MapContainer from 'containers/covid19/recipient/map/MapContainer';
import SpendingByRecipient from 'components/covid19/recipient/SpendingByRecipient';

const tabs = [
    {
        internal: 'recipient_locations',
        label: 'Recipient Locations',
        question: 'Where are the recipients that received COVID-19 response funds?',
        component: <MapContainer />
    },
    {
        internal: 'recipients',
        label: 'Recipients',
        question: 'Who are the recipients that received COVID-19 response funding?',
        component: <SpendingByRecipient />
    },
    {
        internal: 'recipient_types',
        label: 'Recipient Types',
        question: 'Which types of businesses have received COVID-19 response funds?',
        disabled: true
    }
];

export default tabs;
