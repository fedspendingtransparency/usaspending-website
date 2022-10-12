/**
 * HeroUpdate.jsx
 * Created by Brian Petway 03/22
 */

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Analytics from 'helpers/analytics/Analytics';
import AnimatedHeading from './AnimatedHeading';

const HeroUpdate = () => {
    const [isPaused, setIsPaused] = useState(false);

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

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsPaused((previousIsPaused) => !previousIsPaused);
        }
    };

    return (
        <section className="homepage-hero">
            <div className="homepage-hero-content">
                <AnimatedHeading paused={isPaused} />
                <div className="hero__lower-wrapper">
                    <div className="hero__center-content-wrapper">
                        <div className="hero__center-content">
                            <div className="hero__button-container">
                                <Link
                                    className="hero__button hero__button--action"
                                    to="/search"
                                    onClick={trackSearchLink}>
                                    Start Searching Awards
                                </Link>
                                <Link
                                    className="hero__button"
                                    to="/about"
                                    onClick={trackAboutLink}>
                                    Learn about USAspending
                                </Link>
                            </div>
                            <div className="hero__text-container">
                                <p>
                                    USAspending is the official open data source of federal spending information.
                                </p>
                            </div>
                            <div className="hero__pause-button-container">
                                <a
                                    className="hero__pause-button"
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => {
                                        setIsPaused((previousIsPaused) => !previousIsPaused);
                                    }}
                                    onKeyPress={(e) => {
                                        keyPressHandler(e);
                                    }}>
                                    { isPaused ?
                                        <><FontAwesomeIcon icon="play" width={10} />&nbsp;&nbsp;Play text animation</>
                                        :
                                        <><FontAwesomeIcon icon="pause" width={10} />&nbsp;&nbsp;Pause text animation</>
                                    }
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage-hero-graphic-container">
                <div className="homepage-hero-graphic">
                    <div className="hero__graphic-layer-background">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/hero-graphic-background-mountains.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-bridge">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/hero-graphic-background-bridge.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-buildings">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/hero-graphic-background-left-hill.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-windmills">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/hero-graphic-background-right-hill.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-foreground">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/hero-graphic-foreground.webp"
                            alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroUpdate;
