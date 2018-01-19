/**
 * Hero.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

const Hero = () => (
    <div className="homepage-hero">
        <div className="hero-content">
            <h1
                className="hero-headline"
                tabIndex={-1}>
                In 2016, the government spent <span className="headline-em">$3.85 trillion.</span>
            </h1>
            <hr className="hero-divider" />
            <div className="hero-description">
                <span className="description-em">Curious to see how this money was spent?</span> We hope so &mdash; we&apos;ve opened the conversation around federal spending and provide the tools to help you navigate the budget from top to bottom.
            </div>
        </div>
    </div>
);

export default Hero;
