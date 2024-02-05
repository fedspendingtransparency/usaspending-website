/**
 * HeroUpdate.jsx
 * Created by Brian Petway 03/22
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { throttle } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import Analytics from 'helpers/analytics/Analytics';
import AnimatedHeading from './AnimatedHeading';
import Button from './../../sharedComponents/buttons/Button';

const HeroUpdate = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= mediumScreen);

    const trackSearchLink = () => Analytics.event({
        event: 'homepage_start_searching_awards',
        category: 'Homepage',
        action: 'Link',
        label: 'search'
    });
    const trackAboutLink = () => Analytics.event({
        event: 'homepage_link',
        category: 'Homepage',
        action: 'Link',
        label: 'about'
    });
    const history = useHistory();
    const handleSearch = () => {
        trackSearchLink();
        const path = `/search`;
        history.push(path);
    };
    const handleDataSources = () => {
        trackAboutLink();
        const path = `/data-sources`;
        history.push(path);
    };

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsPaused((previousIsPaused) => !previousIsPaused);
        }
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsLargeScreen(newWidth >= mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <section className="homepage-hero">
            <div className="homepage-hero-content">
                <AnimatedHeading paused={isPaused} />
                <div className="hero__lower-wrapper">
                    <div className="hero__center-content-wrapper">
                        <div className="hero__center-content">
                            <div className="hero__button-container">
                                <Button
                                    buttonSize="lg"
                                    copy="Start Searching Awards"
                                    buttonTitle="Start Searching Awards"
                                    buttonType="primary"
                                    backgroundColor="light"
                                    onClick={handleSearch} />
                                <Button
                                    buttonSize="lg"
                                    copy="Learn About USAspending.gov"
                                    buttonTitle="Learn About USAspending.gov"
                                    buttonType="secondary"
                                    backgroundColor="light"
                                    onClick={handleDataSources} />
                            </div>
                            <div className="hero__text-container">
                                <p>
                                    USAspending is the official open data source of federal spending information, <br />including information about federal awards such as contracts, grants, and loans.
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
                {isLargeScreen &&
                <div className="homepage-hero-graphic">
                    <div className="hero__graphic-layer-background">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/desktop/hero-graphic-background-mountains@2x.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-bridge">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/desktop/hero-graphic-background-bridge@2x.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-buildings">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/desktop/hero-graphic-background-left-hill@2x.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-windmills">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/desktop/hero-graphic-background-right-hill@2x.webp"
                            alt="" />
                    </div>
                    <div className="hero__graphic-layer-foreground">
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero/desktop/hero-graphic-foreground@2x.webp"
                            alt="" />
                    </div>
                </div> }
                {!isLargeScreen &&
                    <div className="homepage-hero-graphic">
                        <div className="hero__graphic-layer-windmills">
                            <img
                                role="presentation"
                                src="../../../../img/homepage-hero/mobile/mobile-hero-graphic-background-right-hill@2x.webp"
                                alt="" />
                        </div>
                        <div className="hero__graphic-layer-background">
                            <img
                                role="presentation"
                                src="../../../../img/homepage-hero/mobile/mobile-hero-graphic-background-left-hill@2x.webp"
                                alt="" />
                        </div>
                        <div className="hero__graphic-layer-foreground">
                            <img
                                role="presentation"
                                src="../../../../img/homepage-hero/mobile/mobile-hero-graphic-foreground@2x.webp"
                                alt="" />
                        </div>
                    </div> }
            </div>
        </section>
    );
};

export default HeroUpdate;

