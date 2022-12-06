/**
 * TrainingVideosHeading.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import { ShareIcon } from "data-transparency-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const TrainingVideosHeading = () => (
    <section className="youtube-main-container">
        <div className="youtube-content-container">
            <div className="youtube-img-container">
                <img className="youtube-img" src="img/youtube-page/youtube-landing-page-hero-image@2x.webp" alt="placeholder" />
            </div>
        </div>
        <div className="youtube-info-container" >
            <div className="youtube-info-wrap">
                <p className="youtube-resources-title">Resources</p>
                <p className="youtube-header">Training Videos</p>
                <p className="youtube-body">Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube channel for the latest videos!</p>
                <FontAwesomeIcon className="youtube-share-icon" icon={faShareAlt} />
            </div>
        </div>


    </section>
);

export default TrainingVideosHeading;
