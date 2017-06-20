/**
 * WhatsNew.jsx
 * Created by Marco Mendoza 05/4/2017
 **/

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import Breadcrumb from './Breadcrumb';

export default class WhatsNew extends React.Component {
    render() {
        return (
            <div className="usa-da-about-article">
                <MetaTags {...MetaTagHelper.whatsNewPageMetaTags} />
                <Header />
                <Breadcrumb title="What's New" />
                <div className="article-wrapper">
                    <h1>What&#8217;s New</h1>
                    <hr className="results-divider" />
                    <p>
                        The launch of the Beta.USAspending.gov site is just the beginning.
                        Treasury plans on expanding and improving the site over the summer to add
                        functionality and features based on user feedback. Expected enhancements
                        over the next few months include improving visual displays, adding new
                        pages for recipients, federal agencies and enhancing download capabilities.
                        We are asking the public to continue to provide feedback to help us improve
                        the site now that we have the data from across the government.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}
