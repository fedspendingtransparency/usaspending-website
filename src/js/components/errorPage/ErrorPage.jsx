/**
 * ErrorPage.jsx
 * Created by Lizzie Salita 9/27/21
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { errorPageMetaTags } from 'helpers/metaTagHelper';

require('pages/errorPage/errorPage.scss');

const ErrorPage = (props) => {
    let h2Text = 'Sorry, the page you are looking for does not exist.';
    let paragraphText = (
        <p>
            Please check that you typed the address correctly, go back to your previous page or try these helpful links instead:
        </p>
    );

    if (props?.location?.state?.recipientError) {
        h2Text = 'The page you are looking for has been updated.';
        paragraphText = (
            <p>
                Please return to our <Link to="/recipient">Recipient Profile Page</Link> and update any saved links.
            </p>
        );
    }

    return (
        <PageWrapper
            pageName="Error"
            classNames="usa-da-error-page"
            metaTagProps={errorPageMetaTags}
            title="Page Not Found">
            <main id="main-content" className="main-content">
                <h2>{h2Text}</h2>
                <picture>
                    <source
                        srcSet="img/errorPage/ErrorPage404-mobile.webp 1x, img/errorPage/ErrorPage404-desktop.webp 2x"
                        type="image/webp" />
                    <img src="img/errorPage/ErrorPage404-02.svg" alt="404" />
                </picture>
                {paragraphText}
                <ul>
                    <li>
                        <Link to="/">Back to Home</Link>
                    </li>
                    <li>
                        <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=Report%20an%20Error">Report
                            Problem
                        </a>
                    </li>
                    <li>
                        <Link to="/search">Search Award Data</Link>
                    </li>
                    <li>
                        <a href="https://api.usaspending.gov/">Learn about our
                            APIs
                        </a>
                    </li>
                    <li>
                        <a href="https://usaspending-help.zendesk.com/hc/en-us/community/topics">Visit
                            our Community Page
                        </a>
                    </li>
                </ul>
            </main>
        </PageWrapper>
    );
};

export default ErrorPage;
