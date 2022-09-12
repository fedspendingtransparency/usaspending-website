import React from 'react';
import LottieAnimation from '../lottieAnimation/LottieAnimation';

export default class IntroSection extends React.Component {
    render() {
        return (
            <div className="body__content intro-padded__content interactive-data-sources-intro-section">
                <h2>
                    USAspending Data Sources
                </h2>
                <div>
                    <h3>A journey though government spending data</h3>
                    <p>
                    USAspending links data from a variety of government systems, including agency financial systems and award systems. Scroll below to learn more about these systems, as well as the context for this historic initiative to provide federal spending transparency.
                    </p>
                </div>
                <LottieAnimation
                    autoplay
                    loop
                    src="/img/interactive-data-sources/intro-animation.json" />
            </div>
        );
    }
}
