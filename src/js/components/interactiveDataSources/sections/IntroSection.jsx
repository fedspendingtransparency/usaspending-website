/* eslint-disable max-len */
import React from 'react';
import LottieAnimation from '../lottieAnimation/LottieAnimation';

const IntroSection = () => (
    <div className="body__content intro-padded__content interactive-data-sources-intro-section">
        <div className="hero-container">
            <div className="hero__left-item">
                <div className="hero__left-item__content">
                    <h1 data-testid="introText">
                        USAspending Data Sources
                    </h1>
                    <div>
                        <h2>
                            A journey through government spending data
                        </h2>
                        <p data-testid="paragraphText">
                            USAspending.gov links data from many government systems, including agency financial systems and governmentwide award systems. Scroll below to learn more about these systems, as well as the context for this historic initiative to provide federal spending transparency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="interactive-data-sources-intro-animation">
            <LottieAnimation
                autoplay
                loop={1}
                src="/img/interactive-data-sources/intro-animation.json"
                role="presentation" />
        </div>
    </div>
);

export default IntroSection;
