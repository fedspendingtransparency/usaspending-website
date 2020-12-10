/**
 * tooltipContentMapping.jsx
 * Created by Lizzie Salita 12/9/20
 */

import React from 'react';

export const tabTooltips = {
    dates: {
        title: 'Updates by Fiscal Year',
        content: (
            <>
                <p>
                    Please note that columns for the first and second period do not show data for agencies that are only required to report quarterly data.
                </p>
                <p>
                    The columns for the last period of each quarter (i.e., P03, P06, P09, P12) do show data for all agencies. Fiscal years start in October (Period 1), and starting in FY 2022 (i.e., October 2021), all agencies will report monthly data to USAspending.gov.
                </p>
                <p>
                    Cells with a &ldquo;Not Certified&rdquo; badge signal that an agency uploaded data but it is still under review.
                </p>
            </>
        )
    },
    details: {
        title: 'Statistics by Reporting Period',
        content: (
            <>
                <p>
                    Please note that if you select the first or second period of a quarter, you will only see data from agencies that upload monthly. Only by selecting the last period of each quarter (i.e., P03, P06, P09, P12) will you see data for all agencies, including quarterly-submitting agencies.
                </p>
                <p>
                    Fiscal years start in October (Period 1), and starting in FY 2022 (i.e., October 2021), all agencies will report data monthly to USAspending.gov.
                </p>
            </>
        )
    }
};

