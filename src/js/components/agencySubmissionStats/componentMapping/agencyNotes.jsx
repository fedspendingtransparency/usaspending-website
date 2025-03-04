/**
 * agencyNotes.js
 * Created by Lizzie Salita 3/10/21
 */

import React from 'react';

const opicNote = (
    <>
        On January 2nd, 2020, OPIC was replaced by DFC (source:&nbsp;
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.dfc.gov/media/press-releases/us-international-development-finance-corporation-begins-operations" >
            https://www.dfc.gov/media/press-releases/us-international-development-finance-corporation-begins-operations
        </a>
        ). In addition to absorbing OPIC, DFC also combined aspects of USAID,  including chiefly its Development Credit Authority (DCA) (source:&nbsp;
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.congress.gov/115/plaws/publ254/PLAW-115publ254.pdf" >
                https://www.congress.gov/115/plaws/publ254/PLAW-115publ254.pdf
        </a>
        &nbsp;pg 29). For DATA Act reporting purposes, DFC continued to report as OPIC until its last submission in FY20Q4, and began to include the full set of DFC TAS in FY20Q3. DFC's first submission as DFC was in FY21Q1.
    </>
);

// eslint-disable-next-line import/prefer-default-export
export const agencyNotes = {
    // DOD
    '097': 'Department of Defense procurement data is subject to a 90 day delay.',
    // OPIC
    '071': opicNote,
    // DFC
    '077': opicNote,
    // VEF
    519: 'The Vietnam education foundation shut down in 2018. Its last DATA Act submission was in FY18Q4.'
};
