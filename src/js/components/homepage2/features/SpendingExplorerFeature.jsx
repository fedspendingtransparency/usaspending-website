/**
 * SpendingExplorerFeature.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

const SpendingExplorerFeature = () => (
    <div className="feature-spending-explorer">
        <div className="spending-explorer-left">
            <img
                src="img/homepage-spending-explorer.png"
                srcSet="img/homepage-spending-explorer.png 1x, img/homepage-spending-explorer@2x.png 2x"
                alt="Screenshot of the Spending Explorer" />
        </div>
        <div className="spending-explorer-right">
            <h2
                className="feature-title"
                tabIndex={-1}>
                A big-picture view of the federal spending landscape
            </h2>
            <div className="feature-description">
                <p>
                    The <strong>Spending Explorer</strong> lets you explore the entire federal budget in increasing granularity, illustrating how awards derive from federal accounts.
                </p>
                <p>
                    Interactive visualizations provide help building context, and multiple breakdowns clarify the relationships between federal-spending components.
                </p>
            </div>
            <div className="spending-explorer-button-wrap">
                <a
                    className="spending-explorer-button"
                    href="#/explorer">
                    Try our <strong>Spending Explorer</strong>
                </a>
            </div>
        </div>
    </div>
);

export default SpendingExplorerFeature;
