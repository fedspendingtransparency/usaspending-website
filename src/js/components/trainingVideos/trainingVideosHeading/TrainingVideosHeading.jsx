/**
 * TrainingVideosHeading.jsx
 * Created by Brian Petway 12/05/22
 */


// Depricating 9/15/2025


import React, { useState, useEffect } from 'react';
import { FlexGridRow, FlexGridCol, ShareIcon } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';

import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { throttle } from 'lodash-es';
import { showModal } from '../../../redux/actions/modal/modalActions';

const TrainingVideosHeading = () => {
    const slug = 'training-videos';
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const onShareClick = (name) => {
        const emailSubject = `Training Videos for USAspending.gov`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: ` Watch training videos about USAspending.gov: ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
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
    }, [windowWidth]);
    return (
        <section className="training-videos__hero">
            <FlexGridRow className="grid-content">
                <FlexGridCol
                    desktop={6}
                    tablet={0}
                    mobile={0}>
                    <div className="training-videos__column-one">
                        <div className="training-videos__img-container">
                            <img className="training-videos__img" src="img/youtube-page/youtube-landing-page-hero-image@2x.webp" alt="placeholder" />
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
                                    colors={{ backgroundColor: "#edf0ff", color: "#2378c3" }}
                                    dropdownDirection={isMobile ? 'right' : 'left'}
                                    classNames="no-margin-left"
                                    noShareText />
                            </div>
                        </div>
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

export default TrainingVideosHeading;
