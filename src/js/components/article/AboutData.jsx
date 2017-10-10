/**
 * AboutData.jsx
 * Created by Rickey An 04/20/2017
 **/

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

require('layouts/article/aboutArticle.scss');

export default class AboutData extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <MetaTags {...MetaTagHelper.aboutDataPageMetaTags} />
                <Header />
                <Breadcrumb title="About the Data" />
                <div className="article-wrapper">
                    <h1>About the Data</h1>
                    <hr className="results-divider" />
                    <p>
                        Under the U.S. Treasury Department’s leadership, the new site will allow
                        taxpayers to examine nearly $4 trillion in federal spending each year and
                        see how this money flows from Congressional appropriations to local
                        communities and businesses. The data is compiled by Treasury from federal
                        agencies and published quarterly beginning in May 2017. The data will be
                        updated each quarter.
                    </p>
                    <img src="img/spending-heirarchy.png" alt="Data Structure" />
                    <p>
                        Users can search by location (state, city, county), by federal agency or
                        by keyword for a specific policy or type of spending. The website also
                        allows for large amounts of data to be accessed easily through and
                        Application Programming Interface (API) for more technical users.
                    </p>
                    <p>
                        Users can also search for a specific recipient of federal funds – a
                        business, a university or other entity that you would like to know more
                        about. In addition, the public can link awards with the “federal account”
                        that supplied the funding.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}
