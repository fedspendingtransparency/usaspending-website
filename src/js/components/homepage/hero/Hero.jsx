/**
 * Hero.jsx
 * Created by Brian Petway 03/22
 */

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Analytics from 'helpers/analytics/Analytics';
import AnimatedHeading from './AnimatedHeading';

const Hero = () => {
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
        <div style={{ backgroundColor: '#d2e3e5' }}>
            <div style={{ margin: '0 -8.33%' }}>
                <section className="homepage-hero-container" aria-label="Hero sections">
                    <div className="hero__graphic-layer-background">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/homepage-hero-layer-background@2x.png"
                            alt="Hills" />
                    </div>
                    <div className="hero__graphic-layer-bridge">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/homepage-hero-bridge@2x.png"
                            alt="Bridge" />
                    </div>
                    <div className="hero__graphic-layer-buildings">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/homepage-hero-buildings@2x.png"
                            alt="Buildings" />
                    </div>
                    <div className="hero__graphic-layer-windmills">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/homepage-hero-trees-windmills@2x.png"
                            alt="Windmills" />
                    </div>
                    <div className="hero__graphic-layer-foreground">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/homepage-hero-layer-foreground@2x.png"
                            alt="Road" />
                    </div>
                    <div className="homepage-hero-content">
                        <AnimatedHeading paused={isPaused} />
                        <div className="hero__lower-wrapper">
                            {/* <div className="hero__left-image-wrapper">
                                <picture>
                                    <img
                                        role="presentation"
                                        src="../../../../img/homepage-hero-graphic-left.svg"
                                        alt="" />
                                </picture>
                            </div> */}
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
                            {/* <div className="hero__right-image-wrapper">
                                <picture>
                                    <img
                                        role="presentation"
                                        src="../../../../img/homepage-hero-graphic-right.svg"
                                        alt="" />
                                </picture>
                            </div> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Hero;
