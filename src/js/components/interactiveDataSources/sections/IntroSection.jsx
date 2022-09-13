/* eslint-disable max-len */
import React from 'react';
import LottieAnimation from '../lottieAnimation/LottieAnimation';

const IntroSection = () => (
    <div className="body__content intro-padded__content interactive-data-sources-intro-section">
        <div className="hero-container">
            <div className="hero__left-item">
                <div className="hero__left-item__content">
                    <h1>
                        USAspending Data Sources
                    </h1>
                    <div>
                        <h2>
                                A journey though government spending data
                        </h2>
                        <p>
                            USAspending links data from a variety of government systems, including agency financial systems and award systems. Scroll below to learn more about these systems, as well as the context for this historic initiative to provide federal spending transparency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="interactive-data-sources-intro-animation">
            <LottieAnimation
                autoplay
                loop
                src="/img/interactive-data-sources/intro-animation.json" />
        </div>
    </div>
);

export default IntroSection;
