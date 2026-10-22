/**
 * ErrorPage.jsx
 * Created by Lizzie Salita 9/27/21
 */

import React from 'react';
import { Link } from 'react-router';
import PageWrapper from '../../components/sharedComponents/PageWrapper';
import { errorPageMetaTags } from '../../helpers/metaTagHelper';
import ErrorImg from '../../../img/errorPage/ErrorPage404-mobile.webp';

import '../../../_scss/pages/errorPage/errorPage.scss';

const ErrorPage = () => (
    <PageWrapper
        pageName="Error"
        classNames="usa-da-error-page"
        metaTagProps={errorPageMetaTags}
        title="Page Not Found">
        <main id="main-content" className="main-content">
            <h2>Sorry, the page you are looking for does not exist.</h2>
            {/*<img src={ErrorImg} alt="404" />*/}
            <p>
                Please check that you typed the address correctly, go back to your
                previous page or try these helpful links instead:
            </p>
            <ul>
                <li>
                    <Link to="/">Back to Home</Link>
                </li>
                <li>
                    <a href={`mailto:usaspending.help@fiscal.treasury.gov?subject=${encodeURIComponent("Report an Error")}`}>Report Problem</a>
                </li>
                <li>
                    <Link to="/search">Search Award Data</Link>
                </li>
                <li>
                    <a href="https://api.usaspending.gov/" rel="noopener noreferrer" target="_blank">Learn about our APIs</a>
                </li>
                <li>
                    <a href="https://fiscalservice.force.com/usaspending/s/" rel="noopener noreferrer" target="_blank">Visit our Community Page</a>
                </li>
            </ul>
        </main>
    </PageWrapper>
);

export default ErrorPage;
