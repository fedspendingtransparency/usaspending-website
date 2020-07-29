/**
 * ErrorPage.jsx
 * Created by Kevin Li 8/10/17
 */

import React from 'react';

import { ExclamationCircle } from 'components/sharedComponents/icons/Icons';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';
import Header from 'containers/shared/HeaderContainer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';

require('pages/errorPage/errorPage.scss');

const ErrorPage = () => (
    <div className="usa-da-error-page">
        <MetaTags {...MetaTagHelper.errorPageMetaTags} />
        <Header />
        <main id="main-content">
            <div className="error-content">
                <div className="error-box">
                    <div className="error-header">
                        <div className="error-icon">
                            <ExclamationCircle alt="Page not found" />
                        </div>
                        <div className="error-title">
                            <h1>Page not found</h1>
                        </div>
                    </div>
                    <div className="error-body">
                        <p>Sorry, the page you are looking for doesn&apos;t exist.</p>
                        <p>
                            Check the URL for typos or <a href="#/">return to the home page.</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default ErrorPage;
