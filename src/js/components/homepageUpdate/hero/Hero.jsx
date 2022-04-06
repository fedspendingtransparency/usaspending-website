/**
 * Hero.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Analytics from 'helpers/analytics/Analytics';
import HeroPoc from './HeroPoc';

const Hero = () => {

    const [ isPaused, setIsPaused ] = useState(false);

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
                <HeroPoc paused={ isPaused } />
                <div className="hero__lower-wrapper">
                    <div className="hero__left-image-wrapper">
                        <picture>
                            <img
                                role="presentation"
                                src="../../../../img/homepage-hero-person-left.svg"
                                alt="" />
                        </picture>
                    </div>
                    <div className="hero__center-content-wrapper">
                        <div className="hero__center-content">
                            <div className="hero__button-container">
                                <Link
                                    className="hero__button hero__button--action shadow"
                                    to="/search"
                                    onClick={trackSearchLink}>
                                    Start Searching Awards
                                </Link>
                                <Link
                                    className="hero__button shadow"
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
                                <a className="hero__pause-button" onClick={() => { setIsPaused((previousIsPaused) => !previousIsPaused); }}>
                                    <FontAwesomeIcon icon="fa-equals" />Pause text animation
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hero__right-image-wrapper">
                        <picture>
                            <img
                                role="presentation"
                                src="../../../../img/homepage-hero-people-right.svg"
                                alt="" />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
