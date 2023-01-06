/**
 * TrainingVideosHeading.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const TrainingVideosHeading = () => (
    <section className="training-videos__hero">
        <FlexGridRow className="grid-content">
            <FlexGridCol
                desktop={6}
                tablet={0}
                mobile={0}>
                <div className="training-videos__column-one">
                    <div className="training-img-container">
                        <img className="training-img" src="img/youtube-page/youtube-landing-page-hero-image@2x.webp" alt="placeholder" />
                    </div>
                </div>
            </FlexGridCol>
            <FlexGridCol
                desktop={6}
                tablet={12}
                mobile={12}>
                <div className="training-videos__column-two" >
                    <div className="training-videos__column-two-container">
                        <div className="training-videos__column-two-title">RESOURCES</div>
                        <div className="training-videos__column-two-header">Training Videos</div>
                        <div className="training-videos__column-two-body">Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube channel for the latest videos!</div>
                        <FontAwesomeIcon className="training-videos__column-two-share-icon" icon={faShareAlt} />
                    </div>
                </div>
            </FlexGridCol>
        </FlexGridRow>
    </section>
);

export default TrainingVideosHeading;
