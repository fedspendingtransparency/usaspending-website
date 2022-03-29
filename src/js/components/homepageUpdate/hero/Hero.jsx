/**
 * Hero.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React from 'react';
import { Link } from "react-router-dom";
import Analytics from 'helpers/analytics/Analytics';

const Hero = () => {
    const trackSearchLink = () => Analytics.event({
        category: 'Homepage',
        action: 'Link',
        label: 'search'
    });
    const trackAboutLink = () => Analytics.event({
        category: 'Homepage',
        action: 'Link',
        label: 'about'
    });
    return (
        <section className="homepage-hero-container" aria-label="Hero sections">
            <div className="homepage-hero-content">
                <div className="hero__temp-h1">Download government spending by who
                    receives money
                </div>
                <div className="hero__lower-wrapper">
                    <div className="hero__left-image-wrapper">
                        <picture>
                            <img
                                src="../../../../img/homepage-hero-person-left.svg"
                                alt="left" />
                        </picture>
                    </div>
                    <div className="hero__center-content-wrapper">
                        <div className="hero__center-content">
                            <div className="hero__button-container">
                                <Link
                                    className="hero__button-search"
                                    to="/search"
                                    onClick={trackSearchLink}>
                                    Start Searching Awards
                                </Link>
                                <Link
                                    className="hero__button-learn"
                                    to="/about"
                                    onClick={trackAboutLink}>
                                    Learn About USAspending
                                </Link>
                            </div>
                            <div className="hero__text-container">
                                <p>
                                    USAspending is the official open data source of federal spending information.
                                </p>
                            </div>
                            <div className="hero__pause-button-container">
                                <p>pause button placeholder</p>
                            </div>
                        </div>
                    </div>
                    <div className="hero__right-image-wrapper">
                        <picture>
                            <img
                                src="../../../../img/homepage-hero-people-right.svg"
                                alt="right" />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
