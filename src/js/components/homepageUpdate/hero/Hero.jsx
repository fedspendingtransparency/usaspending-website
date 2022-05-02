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
      <section className="homepage-hero-container" aria-label="Hero sections">
        <div className="homepage-hero-content">
          <AnimatedHeading paused={isPaused} />
            <div className="hero__lower-wrapper">
              <div className="hero__left-image-wrapper">
                <picture>
                  <img
                    role="presentation"
                    src="../../../../img/homepage-hero-graphic-left.svg"
                    alt="" />
                </picture>
              </div>
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
                  <div className="hero__right-image-wrapper">
                    <picture>
                        <img
                            role="presentation"
                            src="../../../../img/homepage-hero-graphic-right.svg"
                            alt="" />
                      </picture>
                  </div>
            </div>
        </div>
      </section>
    );
};

export default Hero;
