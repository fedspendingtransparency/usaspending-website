/**
 * DataDictionaryPage.jsx
 * Created by Brett Varney 4/22/2021
 */

import React from 'react';
import { PageHeader } from "data-transparency-ui";

import { dataDictionaryPageMetaTags } from 'helpers/metaTagHelper';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

import DataDictionaryContainer from "containers/dataDictionary/DataDictionaryContainer";

require('pages/dataDictionary/dataDictionaryPage.scss');

export default class DataDictionaryPage extends React.Component {
    render = () => (
        <div className="usa-da-data-dictionary-page">
            <MetaTags {...dataDictionaryPageMetaTags} />
            <Header />
            <PageHeader
                overLine="Resources"
                title="Data Dictionary"
                stickyBreakPoint={getStickyBreakPointForSidebar()} >
                <div id="main-content">
                    <DataDictionaryContainer />
                </div>
                <Footer />
            </PageHeader>
        </div>
    );
}
