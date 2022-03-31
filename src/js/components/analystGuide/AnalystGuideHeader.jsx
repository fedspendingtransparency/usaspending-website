import React from 'react';
import PropTypes from 'prop-types';

const AnalystGuideHeader = ({ title, subtitle }) => (
	<div className="hero-container">
		<div className="hero__left-item">
			<div className="hero__left-item__content">
				<h2>{title}</h2>
				<h3>{subtitle}</h3>
			</div>
		</div>
		<div className="hero__right-item">
			<div>picture goes here</div>
		</div>
	</div>
);

export default AnalystGuideHeader;

AnalystGuideHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

