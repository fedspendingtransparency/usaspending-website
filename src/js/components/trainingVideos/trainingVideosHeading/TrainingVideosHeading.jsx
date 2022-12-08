/**
 * TrainingVideosHeading.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const TrainingVideosHeading = () => (
    <section className="youtube-main-container">
        <FlexGridRow className="grid-content" hasGutter gutterSize="lg">
            <FlexGridCol
                width={6}
                desktop={6}
                tablet={0}
                mobile={0}>
                <div className="youtube-content-container">
                    <div className="youtube-img-container">
                        <img className="youtube-img" src="img/youtube-page/youtube-landing-page-hero-image@2x.webp" alt="placeholder" />
                    </div>
                </div>
            </FlexGridCol>
            <FlexGridCol
                width={4}
                desktop={4}
                tablet={4}
                mobile={2}>
                <div className="youtube-info-container" >
                    <div className="youtube-info-wrap">
                        <p className="youtube-resources-title">RESOURCES</p>
                        <p className="youtube-header">Training Videos</p>
                        <p className="youtube-body">Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube channel for the latest videos!</p>
                        <FontAwesomeIcon className="youtube-share-icon" icon={faShareAlt} />
                    </div>
                </div>
            </FlexGridCol>
        </FlexGridRow>

    </section>
);

export default TrainingVideosHeading;
