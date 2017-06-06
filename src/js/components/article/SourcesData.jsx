/**
 * SourcesData.jsx
 * Created by Rickey An 04/20/2017
 **/

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class SourcesData extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <MetaTags {...MetaTagHelper.sourcesOfDataPageMetaTags} />
                <Header />
                <Breadcrumb title="Sources of Data" />
                <div className="article-wrapper">
                    <h1>Sources of Data</h1>
                    <hr className="results-divider" />
                    <p>
                        Treasury issued the DATA Act Information Model Schema (DAIMS) v. 1.0 in
                        April 2016. The DAIMS is the most critical component of the DATA Act
                        implementation because it sets the requirements for all the data elements
                        to be reported by federal agencies, the relationships between each element,
                        the validation rules and the overall context of how the data fits together.
                    </p>
                    <p>
                        There are more than 400 interconnected data elements within the DAIMS –
                        some are submitted directly from the agency financial systems and others
                        are pulled or derived from authoritative government-wide systems. For more
                        information on the DAIMS please visit: <a href="https://fedspendingtransparency.github.io/data-model/">https://fedspendingtransparency.github.io/data-model/</a>.
                    </p>
                    <img src="img/information-flow.png" alt="Information Flow" />
                </div>
                <Footer />
            </div>
        );
    }
}
