/**
 * VideoCard.jsx
 * Created by Andrea Blackwell 12/20/22
 */

import React from "react";
import PropTypes from "prop-types";
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
    id: PropTypes.string
};

const VideoCard = ({
    thumbnailUrl, title, duration, description, publishedAt, onClick
}) => {
    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            onClick();
        }
    };
    return (
        <>
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
                    <div className="video-card__metadiv">
                        {publishedAt}
                    </div>
                </CardBody>
            </CardContainer>
        </>
    );
};

VideoCard.propTypes = propTypes;

export default VideoCard;
