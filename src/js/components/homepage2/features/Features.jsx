/**
 * Features.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

const Features = () => (
    <section
        id="homepage-features"
        className="homepage-features"
        aria-label="Web site features">
        <div className="feature-spending-explorer">
            <h2
                className="feature-title">
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
        </div>
    </section>
);

export default Features;
