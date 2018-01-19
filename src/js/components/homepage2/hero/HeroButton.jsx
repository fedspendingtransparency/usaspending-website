/**
 * HeroButton.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import { AngleDown } from 'components/sharedComponents/icons/Icons';
import { scrollToY } from 'helpers/scrollToHelper';

const HeroButton = () => {
    const pressedButton = () => {
        const featureContent = document.getElementById('homepage-features');
        if (!featureContent) {
            return;
        }

        const sectionTop = featureContent.offsetTop - 10;
        scrollToY(sectionTop, 700);

        const featureHeader = document.querySelector('#homepage-features h2');
        if (featureHeader) {
            featureHeader.focus();
        }
    };

    return (
        <div className="hero-button-wrapper">
            <button
                className="hero-button"
                onClick={pressedButton}
                aria-label="Go to content">
                <AngleDown alt="Arrow pointing down" />
            </button>
        </div>
    );
};

export default HeroButton;
