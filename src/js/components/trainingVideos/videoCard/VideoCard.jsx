/**
 * VideoCard.jsx
 * Created by Andrea Blackwell 12/20/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { ShareIcon } from 'data-transparency-ui';
import { handleShareOptionClick } from 'helpers/socialShare';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from 'lodash';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import VideoThumbnail from "../videoThumbnails/VideoThumbnail";

const propTypes = {
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    publishedAt: PropTypes.string,
    onClick: PropTypes.func,
    onKeyUp: PropTypes.func,
    url: PropTypes.func
};

const VideoCard = ({
    thumbnailUrl, title, duration, onClick, description, onKeyUp, publishedAt, url
}) => {
    const slug = url;
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const onShareClick = (name) => {
        const emailSubject = `${title}`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Watch this video about USAspending.gov: ${slug}`
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
        <CardContainer variant="outline" size="md" onClick={onClick} tabIndex="0" onKeyUp={onKeyUp}>
            <CardHero
                variant="expanded"
                thumbnail>
                <VideoThumbnail
                    thumbnailUrl={thumbnailUrl}
                    duration={duration}
                    showPlay
                    showDuration
                    title={title} />
            </CardHero>
            <CardBody
                headline={
                    <div>
                        {title}
                    </div>
                }
                text={description}>
                <div className="list-of-videos__inline">
                    <div className="video-card__metadiv">
                        {publishedAt}
                    </div>
                    <div className="list-of-videos__column-share-icon">
                        <ShareIcon
                            url={slug}
                            tabIndex={0}
                            onKeyUp={onKeyUp}
                            onShareOptionClick={onShareClick}
                            colors={{ backgroundColor: "white", color: "#2378c3" }}
                            dropdownDirection={isMobile ? 'right' : 'left'} />
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
};

VideoCard.propTypes = propTypes;

export default VideoCard;
