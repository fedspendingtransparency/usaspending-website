/**
 * TrainingVideosHeading.jsx
 * Created by Brian Petway 12/05/22
 */

import React, { useState, useEffect } from 'react';
import { FlexGridRow, FlexGridCol, ShareIcon } from 'data-transparency-ui';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { throttle } from 'lodash';

const TrainingVideosHeading = () => {
    const slug = 'training-videos';
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const onShareClick = (name) => {
        const emailSubject = `USAspending.gov Analyst's Guide`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Interested in learning how to effectively use Federal Spending Data? Check out #USAspending Analyst Guide! ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <section className="training-videos__hero">
            <FlexGridRow className="grid-content">
                <FlexGridCol
                    desktop={6}
                    tablet={0}
                    mobile={0}>
                    <div className="training-videos__column-one">
                        <div className="trianing-img-container">
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
                            <div className="training-video__column-share-icon">
                                <ShareIcon
                                    url={getBaseUrl(slug)}
                                    onShareOptionClick={onShareClick}
                                    colors={{ backgroundColor: "#ccecf2", color: "#2378c3" }}
                                    dropdownDirection={isMobile ? 'right' : 'left'} />
                            </div>
                        </div>
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

export default TrainingVideosHeading;
