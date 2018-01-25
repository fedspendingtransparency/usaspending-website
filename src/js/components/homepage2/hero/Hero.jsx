/**
 * Hero.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import HeroButton from './HeroButton';

const Hero = () => (
    <section
        className="homepage-hero"
        aria-label="Introduction">
        <div className="homepage-hero__wrapper">
            <div className="homepage-hero__content">
                <h1
                    className="homepage-hero__headline"
                    tabIndex={-1}>
                    In 2016, the government spent <strong className="homepage-hero__headline homepage-hero__headline_weight_bold">$3.85 trillion.</strong>
                </h1>
                <hr className="homepage-hero__divider" />
                <div className="homepage-hero__description">
                    <strong className="homepage-hero__description homepage-hero__description_weight_bold">Curious to see how this money was spent?</strong> We hope so &mdash; we&apos;ve opened the conversation around federal spending and provide the tools to help you navigate the budget from top to bottom.
                </div>
            </div>
            <HeroButton />
        </div>
    </section>
);

export default Hero;
