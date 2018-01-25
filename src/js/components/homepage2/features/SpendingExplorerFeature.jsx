/**
 * SpendingExplorerFeature.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

const SpendingExplorerFeature = () => (
    <div className="feature-spending-explorer">
        <div className="feature-spending-explorer__wrapper">
            <div className="feature-spending-explorer__image-wrapper">
                <img
                    className="feature-spending-explorer__image"
                    src="img/homepage-spending-explorer.png"
                    srcSet="img/homepage-spending-explorer.png 1x, img/homepage-spending-explorer@2x.png 2x"
                    alt="Screenshot of the Spending Explorer" />
            </div>
            <div className="feature-spending-explorer__content">
                <h2
                    className="homepage-feature-title"
                    tabIndex={-1}>
                    A big-picture view of the federal spending landscape
                </h2>
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
                        href="#/explorer">
                        Try our <strong className="feature-spending-explorer__button-text feature-spending-explorer__button-text_weight_bold">Spending Explorer</strong>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default SpendingExplorerFeature;
