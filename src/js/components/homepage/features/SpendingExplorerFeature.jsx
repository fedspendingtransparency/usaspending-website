/**
 * SpendingExplorerFeature.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';
import Analytics from 'helpers/analytics/Analytics';

import spendingExplorerSrc from "../../../../img/homepage-spending-explorer.png";

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
                <img
                    className="feature-spending-explorer__image"
                    src={spendingExplorerSrc}
                    srcSet={`${spendingExplorerSrc} 1x ${spendingExplorerSrc} 2x`}
                    alt="Screenshot of the Spending Explorer" />
            </div>
            <div className="feature-spending-explorer__content">
                <h2
                    className="homepage-feature-title"
                    tabIndex={-1}>
                    A big-picture view of the federal spending landscape
                </h2>
                <div className="feature-spending-explorer__image-wrapper feature-spending-explorer__image-wrapper_mobile">
                    <img
                        className="feature-spending-explorer__image"
                        src={src}
                        srcSet={`${src} 1x ${src} 2x`}
                        alt="Screenshot of the Spending Explorer" />
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
                    <a
                        className="feature-spending-explorer__button"
                        href="#/explorer"
                        onClick={clickedHomepageLink.bind(null, '/explorer')}>
                        Try our <strong className="feature-spending-explorer__button-text feature-spending-explorer__button-text_weight_bold">Spending Explorer</strong>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default SpendingExplorerFeature;
