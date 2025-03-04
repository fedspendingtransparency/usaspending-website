/**
 * tooltipContentMapping.jsx
 * Created by Lizzie Salita 12/9/20
 */

import React from 'react';

export const tabTooltips = {
    'Updates by Fiscal Year': (<p>The columns for the last period of each quarter (i.e., P03, P06, P09, P12) do show data for all agencies. Fiscal years start in October (Period 1), and starting in FY 2022 (i.e., October 2021), all agencies will report monthly data to USAspending.gov.</p>),
    'Statistics by Submission Period': (
        <>
            <p>
                Please note that if you select the first or second period of a quarter, you will only see data from agencies that upload monthly. Only by selecting the last period of each quarter (i.e., P03, P06, P09, P12) will you see data for all agencies, including quarterly-submitting agencies.
            </p>
            <p>
                Fiscal years start in October (Period 1), and starting in FY 2022 (i.e., October 2021), all agencies will report data monthly to USAspending.gov.
            </p>
        </>
    )
};

export const columnTooltips = {
    'Most Recent Update': (
        <>
            <p>
                This column shows the most recent date on which the agency reported data from the selected submission period to USAspending.gov.
            </p>
            <p>
                If you are viewing the last period in a quarter, you may notice agencies that report quarterly do not show data, or have a later report date than the agencies reporting monthly. This is because the quarterly submission deadline is slightly later than the monthly deadline. Such timing differences will disappear in October 2021 when all agencies transition to monthly reporting.
            </p>
            <p>
                &quot;--&quot; indicates that an agency has not submitted data for this period.
            </p>
        </>
    ),
    'Number of TASs Missing from Account Balance Data': (
        <>
            <p>
                Agencies submit account balance data grouped by Treasury Account Symbols (TAS) in two ways: 1) to USAspending.gov in File A and 2) to GTAS, a separate system that is the authoritative source of governmentwide TAS account balances. This column shows the number of TAS that are in GTAS but missing in USAspending.gov data.
            </p>
            <p>
                Note that financing TAS, while present in GTAS, are completely excluded from this calculation, as they do not involve budgetary spending and therefore are not appropriate for publication on USAspending.
            </p>
            <p>
                &quot;--&quot; indicates that an agency has not submitted data for this period.
            </p>
        </>
    ),
    'Reporting Difference in Obligations': (
        <>
            <p>
                Agencies report spending (i.e., obligations) to USAspending in two ways: 1) by showing a reduction in their reported account balances submitted in File A and 2) their reported spending amounts submitted in File B.
            </p>
            <p>
                This column shows the differences in these two reported spending amounts.
            </p>
            <p>
                &quot;--&quot; indicates that an agency has not submitted data for this period.
            </p>
        </>
    ),
    'Number of Unlinked Contract Awards': (
        <>
            <p>
                Agencies submit contract information to USAspending.gov in two ways: 1) contract award spending data submitted in File C from their financial systems and 2) contract award and recipient data submitted in File D1 from their separate procurement systems.
            </p>
            <p>
                Because these data originate from communities and systems subject to different policies and reporting requirements, there are sometimes gaps between awards captured in each data set.
            </p>
            <p>
                This column shows how many awards were &ldquo;unlinked&rdquo;, or lack a common award ID that allows these two systems to match their records. When an award is linked, USAspending can include additional fields from the submitted datasets. When an award cannot be linked, it will only show up in some parts of the site and will be missing its full context.
            </p>
            <p>
                Note that this column shows if an award was linked at any point in time to account for any timing delays.
            </p>
        </>
    ),
    'Number of Unlinked Assistance Awards': (
        <>
            <p>
                Agencies submit assistance award (e.g., loans, grants) information to USAspending.gov in two ways: 1) award spending data submitted in File C from their financial systems and 2) assistance award and recipient data submitted in File D2 from their separate financial assistance systems.
            </p>
            <p>
                Because these data originate from communities and systems subject to different policies and reporting requirements, there are sometimes gaps between awards captured in each data set.
            </p>
            <p>
                This column shows how many awards were &ldquo;unlinked&rdquo;, or lack a common award ID that allows these two systems to match their records. When an award is linked, USAspending can include additional fields from the submitted datasets. When an award cannot be linked, it will only show up in some parts of the site and will be missing its full context.
            </p>
            <p>
                Note that this column shows if an award was linked at any point in time to account for any timing delays.
            </p>
        </>
    ),
    'Agency Comments': (
        <p>
            Agency Comments are optional and provided by agencies at the time they submit their data to USAspending.gov in the required dataset formats (File A, B, C, D1, and D2). For more information about the DATA Act reporting flow, visit <a target="_blank" rel="noopener noreferrer" href="https://fiscal.treasury.gov/files/data-transparency/daims-information-flow-diagram.pdf">https://fiscal.treasury.gov/files/data-transparency/daims-information-flow-diagram.pdf</a>
        </p>
    ),
    percentOfBudgetSubmissions: (
        <>
            <p>
                This is an agency&apos;s total budgetary resources for the fiscal year through the selected period as a portion of all agency budgetary resources to-date.
            </p>
            <p>
                &quot;--&quot; indicates that an agency has not submitted data for this period.
            </p>
        </>
    ),
    percentOfBudgetPublications: (
        <>
            <p>
                This is an agency&apos;s total budgetary resources for the most recent period of the selected fiscal year as a portion of all agency budgetary resources to-date.
            </p>
            <p>
                &quot;--&quot; indicates that an agency has not submitted data for this period.
            </p>
        </>
    )
};
