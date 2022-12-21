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
    publishedAt: PropTypes.string
};

const VideoCard = ({ thumbnailUrl, title }) => (
    <CardContainer variant="outline" size="md">
        <CardHero
            variant="expanded"
            thumbnail>
            <VideoThumbnail thumbnailUrl={thumbnailUrl} />
        </CardHero>
        <CardBody
            headline={
                <div>
                    {title}
                </div>
            }>
        </CardBody>
    </CardContainer>
);

VideoCard.propTypes = propTypes;

export default VideoCard;
