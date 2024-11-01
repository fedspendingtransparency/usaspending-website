/**
 * TASDeprecationNotice.jsx
 * Created by Brian Petway 10/30/2024
 */

import React from 'react';

const TASDeprecationNotice = () => (
    <div className="tas-deprecation-notice__container">
        <div className="tas-deprecation-notice__heading">
                The TAS Components filter will be removed
        </div>
        <div className="tas-deprecation-notice__text">
                You can still search for a specific TAS or Federal Account in the search text field within the Treasury Account tab.
        </div>
        <div className="tas-deprecation-notice__text">
                The API endpoint for this filter will still be available.
        </div>
    </div>
);

export default TASDeprecationNotice;
