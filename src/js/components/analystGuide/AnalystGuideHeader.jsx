import React from 'react';
import PropTypes from 'prop-types';

const AnalystGuideHeader = ({ title, subtitle }) => (
    <div className="hero-container">
        <div className="hero__left-item">
            <div className="hero__left-item__content">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </div>
        </div>
        <div className="hero__right-item">
            <div className="hero__right-image-wrapper">
                <picture>
                    <img
                        className="hero__right-image"
                        role="presentation"
                        src="../../../../img/analyst-guide-hero-graphic-2x.png"
                        alt="Treasury Department building in the background overlaid with a floating bar chart with a trend line." />
                </picture>
            </div>
        </div>
    </div>
);

export default AnalystGuideHeader;

AnalystGuideHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

