/**
 * SearchFeature.jsx
 * Created by Kevin Li 1/22/18
 */

import React from 'react';

import ImageCarousel from './ImageCarousel';

const SearchFeature = () => {
    const images = [
        {
            src: 'img/homepage-award-search.png',
            srcSet: 'img/homepage-award-search.png 1x, img/homepage-award-search@2x.png 2x',
            alt: 'Screenshot of the Award Search page, showing a map data visualization'
        },
        {
            src: 'img/homepage-keyword-search.png',
            srcSet: 'img/homepage-keyword-search.png 1x, img/homepage-keyword-search@2x.png 2x',
            alt: 'Screenshot of the Keyword Search page'
        }
    ];

    return (
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
                <ImageCarousel
                    images={images} />
            </div>
        </div>
    );
};

export default SearchFeature;
