/**
 * DataDictionaryPage.jsx
 * Created by Brett Varney 4/22/2021
 */

import React from 'react';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { dataDictionaryPageMetaTags } from 'helpers/metaTagHelper';

import DataDictionaryContainer from 'containers/dataDictionary/DataDictionaryContainer';

require('../../../_scss/pages/dataDictionary/dataDictionaryPage.scss');

export default class DataDictionaryPage extends React.Component {
    render = () => (
        <PageWrapper
            pageName="Data Dictionary"
            classNames="usa-da-data-dictionary-page"
            metaTagProps={dataDictionaryPageMetaTags}
            title="Data Dictionary">
            <div id="main-content">
                <DataDictionaryContainer />
            </div>
        </PageWrapper>
    );
}
