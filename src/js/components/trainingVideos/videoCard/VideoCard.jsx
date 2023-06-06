/**
 * VideoCard.jsx
 * Created by Andrea Blackwell 12/20/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes, { oneOfType } from "prop-types";
import { ShareIcon, CardContainer, CardHero, CardBody } from 'data-transparency-ui';
import { handleShareOptionClick } from 'helpers/socialShare';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from 'lodash';
import VideoThumbnail from "../videoThumbnails/VideoThumbnail";

const propTypes = {
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    publishedAt: PropTypes.string,
    onClick: PropTypes.func,
    onKeyUp: PropTypes.func,
    url: oneOfType([PropTypes.string, PropTypes.func])
};

const VideoCard = ({
    thumbnailUrl, title, duration, onClick, description, onKeyUp, publishedAt, url
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const onShareClick = (name) => {
        const emailSubject = `${title}`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Watch this video about USAspending.gov: ${url}`
        };
        handleShareOptionClick(name, url, emailArgs);
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
    let changedTitle;
    let overline;
    if (title.startsWith("TUTORIAL:") || title.startsWith("OVERVIEW:")) {
        changedTitle = title.substring(10);
        overline = title.substring(0, 8);
    } else if (title.startsWith("QUICK START:")) {
        changedTitle = title.substring(13);
        overline = title.substring(0, 11);
    }
    return (
        <CardContainer variant="outline" size="md" tabIndex="0" onKeyUp={onKeyUp}>
            <CardHero
                onClick={onClick}
                variant="expanded"
                thumbnail>
                <VideoThumbnail
                    thumbnailUrl={thumbnailUrl}
                    duration={duration}
                    showPlay
                    showDuration
                    title={changedTitle} />
            </CardHero>
            <CardBody
                overline={overline}
                headline={
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div className="video-card__headline" onClick={onClick} >
                            {changedTitle}
                        </div>
                    </div>
                }
                text={description}>
                <div className="list-of-videos__inline">
                    <div className="video-card__metadiv">
                        {publishedAt}
                    </div>
                    <div className="list-of-videos__column-share-icon">
                        <ShareIcon
                            url={url}
                            tabIndex={0}
                            onKeyUp={onKeyUp}
                            onShareOptionClick={onShareClick}
                            colors={{ backgroundColor: "white", color: "#2378c3" }}
                            dropdownDirection={isMobile ? 'left' : 'right'} />
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
};

VideoCard.propTypes = propTypes;

export default VideoCard;
