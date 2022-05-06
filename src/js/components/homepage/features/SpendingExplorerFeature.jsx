/**
 * SpendingExplorerFeature.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';
import Analytics from 'helpers/analytics/Analytics';
import { Link } from 'react-router-dom';

const clickedHomepageLink = (route) => {
    Analytics.event({
        category: 'Homepage - Link',
        action: route
    });
};

const SpendingExplorerFeature = () => (
    <div className="feature-spending-explorer">
        <div className="feature-spending-explorer__wrapper">
            <div className="feature-spending-explorer__image-wrapper feature-spending-explorer__image-wrapper_desktop">
                <picture>
                    <source srcSet="img/homepage-spending-explorer.webp 1x, img/homepage-spending-explorer@2x.webp 2x" type="image/webp" />
                        <source srcSet="img/homepage-spending-explorer.png" type="image/png" />
                            <img src="img/homepage-spending-explorer.png" alt="Screenshot of the Spending Explorer" />
                </picture>
            </div>
                <div className="feature-spending-explorer__content">
                    <h2
                        className="homepage-feature-title"
                        tabIndex={-1}>
                    A big-picture view of the federal spending landscape
                    </h2>
                        <div className="feature-spending-explorer__image-wrapper feature-spending-explorer__image-wrapper_mobile">
                            <picture className="feature-spending-explorer__image">
                                <source srcSet="img/homepage-spending-explorer.webp 1x, img/homepage-spending-explorer@2x.webp 2x" type="image/webp" />
                                    <source srcSet="img/homepage-spending-explorer.png" type="image/png" />
                                        <img src="img/homepage-spending-explorer.png" alt="Screenshot of the Spending Explorer" />
                            </picture>
                        </div>
                            <div className="homepage-feature-description">
                                <p>
                        The <strong className="homepage-feature-description_weight_bold">Spending Explorer</strong> lets you explore the entire federal budget in increasing granularity, illustrating how awards derive from federal accounts.
                                </p>
                                    <p>
                        Interactive visualizations provide help building context, and multiple breakdowns clarify the relationships between federal-spending components.
                                    </p>
                            </div>
                                <div className="feature-spending-explorer__button-wrap">
                                    <Link
                                        className="feature-spending-explorer__button"
                                        to="/explorer"
                                        onClick={clickedHomepageLink.bind(null, '/explorer')}>
                        Try our <strong className="feature-spending-explorer__button-text feature-spending-explorer__button-text_weight_bold">Spending Explorer</strong>
                                    </Link>
                                </div>
                </div>
        </div>
    </div>
);

export default SpendingExplorerFeature;
