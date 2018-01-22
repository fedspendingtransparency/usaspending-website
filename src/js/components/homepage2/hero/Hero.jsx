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
        <div className="hero-content">
            <h1
                className="hero-headline"
                tabIndex={-1}>
                In 2016, the government spent <strong>$3.85 trillion.</strong>
            </h1>
            <hr className="hero-divider" />
            <div className="hero-description">
                <strong>Curious to see how this money was spent?</strong> We hope so &mdash; we&apos;ve opened the conversation around federal spending and provide the tools to help you navigate the budget from top to bottom.
            </div>
        </div>
        <HeroButton />
    </section>
);

export default Hero;
