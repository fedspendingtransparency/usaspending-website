/**
 * StatusOfFundsNotes.jsx
 * Created by Brian Petway 11/18/21
 */

import React from "react";

const StatusOfFundsNotes = () => (
    <div className="status-of-funds__notes-wrapper">
        <div className="status-of-funds__notes-text">
            <b>NOTE:</b> The agency sub-components displayed in this section were
            added to provide greater transparency into the organization of agencies’
            account data. These sub-components are based on the Bureau associated
            with a federal account in OMB’s Master Accounts Title file.
            Sub-components are identified using Agency Identifier (AID) codes.
            Department of Defense (DoD) sub-components
            correspond to the branches of the Armed Forces and accounts for the
            agency are attributed to the appropriate branch/sub-component based on
            the Agency Codes found at the bottom of{ ' ' }
            <a
                href="https://www.whitehouse.gov/wp-content/uploads/2018/06/app_c.pdf"
                target="_blank"
                rel="noopener noreferrer">
                OMB Circular A-11 Appendix C
            </a>
            .
        </div>
    </div>
);

export default StatusOfFundsNotes;
