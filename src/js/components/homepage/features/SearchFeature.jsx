/**
 * SearchFeature.jsx
 * Created by Kevin Li 1/22/18
 */

import React from 'react';

import { searchOptions } from 'dataMapping/navigation/menuOptions';

import ImageCarousel from './ImageCarousel';
import FeatureDropdown from './FeatureDropdown';

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

const SearchFeature = () => (
    <div className="feature-award-search">
        <div className="feature-award-search__wrapper">
            <div className="feature-homepage__background-flair" />
            <div className="feature-award-search__content">
                <h2
                    className="homepage-feature-title"
                    tabIndex={-1}>
                    A targeted approach to finding federal award data
                </h2>

                <div className="feature-award-search__mobile-carousel">
                    <ImageCarousel
                        images={images}
                        label="Image carousel of Award Search screenshots " />
                </div>

                <div className="homepage-feature-description">
                    <p>
                        Whether you&apos;re a congressional staffer, agency employee, researcher, or data buff, the <strong className="homepage-feature-description_weight_bold">Award Search</strong> will help you answer your toughest questions about federal spending.
                    </p>
                    <p>
                        Our Keyword Search lets you explore award data in broad strokes, while our Advanced Search offers filters that let you customize your data sets. Interactive visualizations &mdash; including a spending map &mdash; complement downloadable files.
                    </p>
                </div>

                <div className="feature-award-search__dropdown">
                    <FeatureDropdown
                        items={searchOptions}>
                        Select <strong>Search Type</strong>
                    </FeatureDropdown>
                </div>
            </div>
            <div className="feature-award-search__image-wrapper">
                <ImageCarousel
                    images={images} />
            </div>
        </div>
    </div>
);

export default SearchFeature;
