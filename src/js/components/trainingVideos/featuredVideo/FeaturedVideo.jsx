/**
 * FeaturedVideo.jsx
 * Created by Brian Petway 12/05/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { FlexGridRow, FlexGridCol, ShareIcon } from 'data-transparency-ui';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { handleShareOptionClick } from 'helpers/socialShare';
import { throttle } from 'lodash';
import VideoThumbnail from "../videoThumbnails/VideoThumbnail";

const propTypes = {
    featuredVideo: PropTypes.array
};

const FeaturedVideo = ({ featuredVideo }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const onShareClick = (name) => {
        const emailSubject = `USAspending.gov Training Video`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Check out #USAspending About The Data! ${<Link href="https://youtu.be/b7SDGhSZ5wM" />}`
        };
        handleShareOptionClick(name, emailArgs);
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
        <section className="featured-video__section">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className="grid-content"
                onKeyDown={() => console.log("launch modal here")}
                onClick={() => console.log("launch modal here")}>
                <FlexGridRow>
                    <FlexGridCol width={5} desktop={5} tablet={12} mobile={12}>
                        <div className="featured-video__text">
                            <div className="featured-video__heading">
                                <div className="featured-video__headline">
                                    Learn how USAspending.gov
                                    <br />
                                    got started
                                </div>
                                <div className="featured-video__inline">
                                    <div className="featured-video__publishedAt">{ featuredVideo.publishedAt }</div>
                                    <div className="training-video-feature__column-share-icon">
                                        <ShareIcon
                                            url="https://youtu.be/b7SDGhSZ5wM"
                                            tabIndex={0}
                                            onShareOptionClick={onShareClick}
                                            colors={{ backgroundColor: "#1b2b85", color: "#fff" }}
                                            dropdownDirection={isMobile ? 'right' : 'left'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FlexGridCol>
                    <FlexGridCol width={7} desktop={7} tablet={12} mobile={12}>
                        <VideoThumbnail
                            tabIndex="0"
                            thumbnailUrl={featuredVideo.thumbnails.maxres.url}
                            duration={featuredVideo.duration}
                            showPlay
                            showDuration
                            title={featuredVideo.title}
                            alt={featuredVideo.title} />
                    </FlexGridCol>
                </FlexGridRow>
            </div>
        </section>
);
};
FeaturedVideo.propTypes = propTypes;
export default FeaturedVideo;
