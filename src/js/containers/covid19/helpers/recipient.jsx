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
        component: <MapContainer />
    },
    {
        internal: 'recipients',
        label: 'Recipients',
        component: <SpendingByRecipient />
    }
];

export default tabs;
