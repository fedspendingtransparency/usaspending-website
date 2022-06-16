/**
 * EquityCovidSpendingPage.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import PageWrapper from "../sharedComponents/PageWrapper";
import { equityPageMetaTags } from "../../helpers/metaTagHelper";

const EquityCovidSpendingPage = () => (
    <PageWrapper
        pageName="EquityCovidSpendingPage"
        noHeader
        metaTagProps={{ ...equityPageMetaTags }}>
        <main id="main-content" className="main-content equity-content">
          NEW PAGE HERE
        </main>

    </PageWrapper>);

export default EquityCovidSpendingPage;
