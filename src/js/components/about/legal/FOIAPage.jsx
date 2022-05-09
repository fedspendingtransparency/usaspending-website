/**
 * FOIAPage.jsx
 * Created by Kevin Li 2/22/18
 */

import React from 'react';
import LegalPage from './common/LegalPage';

const FOIAPage = () => (
    <LegalPage
        activePage="foia"
        title="Freedom of Information Act">
        <p>
            If your FOIA request is about data and information for a specific agency, please contact
            that agency directly.&nbsp;
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.foia.gov/report-makerequest.html">
                Here&#39;s a list of FOIA contacts for various agencies.
            </a>
        </p>
        <p>
            If your FOIA request is related to information concerning the Department of the Treasury,
            Bureau of the Fiscal Service, please visit our&nbsp;
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://fiscal.treasury.gov/foia.html">
                FOIA website
            </a>.
        </p>
    </LegalPage>
);

export default FOIAPage;
