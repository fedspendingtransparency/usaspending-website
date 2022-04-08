/**
 * ErrorPage.jsx
 * Created by Lizzie Salita 9/27/21
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { errorPageMetaTags } from 'helpers/metaTagHelper';

require('pages/errorPage/errorPage.scss');

const ErrorPage = () => (
    <PageWrapper
        pageName="Error"
        classNames="usa-da-error-page"
        metaTagProps={errorPageMetaTags}
        title="Page Not Found">
        <main id="main-content" className="main-content">
            <h2>Sorry, the page you are looking for does not exist.</h2>
            <picture>
                <source srcSet="img/errorPage/ErrorPage404-mobile.webp 1x, img/errorPage/ErrorPage404-desktop.webp 2x" type="image/webp" />
                <img src="img/errorPage/ErrorPage404-02.svg" alt="404" />
            </picture>
            <p>
                Please check that you typed the address correctly, go back to your
                previous page or try these helpful links instead:
            </p>
            <ul>
                <li>
                    <Link to="/">Back to Home</Link>
                </li>
                <li>
                    <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=Report%20an%20Error">Report Problem</a>
                </li>
                <li>
                    <Link to="/search">Search Award Data</Link>
                </li>
                <li>
                    <a href="https://api.usaspending.gov/">Learn about our APIs</a>
                </li>
                <li>
                    <a href="https://fiscalservice.force.com/usaspending/s/">Visit our Community Page</a>
                </li>
            </ul>
        </main>
    </PageWrapper>
);

export default ErrorPage;
