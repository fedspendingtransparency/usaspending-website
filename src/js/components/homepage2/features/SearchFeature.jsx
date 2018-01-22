/**
 * SearchFeature.jsx
 * Created by Kevin Li 1/22/18
 */

import React from 'react';

const SearchFeature = () => (
    <div className="feature-award-search">
        <div className="award-search-background-flair" />
        <div className="award-search-left">
            <h2
                className="feature-title"
                tabIndex={-1}>
                A targeted approach to finding federal award data
            </h2>
            <div className="feature-description">
                <p>
                    Whether you&apos;re a congressional staffer, agency employee, researcher, or data buff, the <strong>Award Search</strong> will help you answer your toughest questions about federal spending.
                </p>
                <p>
                    Our Keyword Search lets you explore award data in broad strokes, while our Advanced Search offers filters that let you customize your data sets. Interactive visualizations &mdash; including a spending map &mdash; complement downloadable files.
                </p>
            </div>
        </div>
        <div className="award-search-right">
            Thing
        </div>
    </div>
);

export default SearchFeature;
