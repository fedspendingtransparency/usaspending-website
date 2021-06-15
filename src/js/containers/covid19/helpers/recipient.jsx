/**
 * recipient.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React from 'react';
import MapContainer from 'containers/covid19/recipient/map/MapContainer';
import SpendingByRecipient from 'components/covid19/recipient/SpendingByRecipient';
import { SpendingByRecipientTabTT } from 'components/covid19/Covid19Tooltips';

const tabs = [
    {
        internal: 'recipient_locations',
        label: 'Recipient Locations',
        component: <MapContainer />
    },
    {
        internal: 'recipients',
        label: 'Recipients',
        component: <SpendingByRecipient />,
        tooltip: <SpendingByRecipientTabTT />,
        tooltipProps: { wide: true }
    }
];

export default tabs;
