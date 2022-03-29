import React from 'react';
import PropTypes from 'prop-types';
import './analyst-guide.scss';

export const AnalystGuideHeader = () => {
	 const title = "hello world";
	 const subtitle = "hello world too";

	return (
		<div>
			{/*<ImageFallback {...props} />*/}
			<div
				className="hero-image-text"
				style={{ backgroundColor: "#f8f8f8" }}>
				<h1 style={{ color: "#1b1b1b" }}>{title}</h1>
				<h2 style={{ color: "#1b1b1b" }}>{subtitle}</h2>
			</div>
		</div>
	);
};

// ResourcesHeading.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	subtitle: PropTypes.string.isRequired,
// 	bgColor: PropTypes.string,
// 	titleColor: PropTypes.string,
// 	subtitleColor: PropTypes.string,
// 	height: PropTypes.string,
// 	width: PropTypes.string,
// };

// ResourcesHeading.defaultProps = {
// 	bgColor: legacyBlue,
// 	titleColor: '#ffffff',
// 	subtitleColor: '#ffffff',
// };
