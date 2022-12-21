import React from "react";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import VideoThumbnail from "../videoThumbnails/VideoThumbnail";

const VideoCard = ({ thumbnailUrl, description }) => (
    <CardContainer variant="outline" size="md">
        <CardHero
            variant="expanded"
            thumbnail>
            <VideoThumbnail thumbnailUrl={thumbnailUrl} />
        </CardHero>
        <CardBody
            headline={
                <div>
                    {description.title}
                </div>
            }>
        </CardBody>
    </CardContainer>
);


export default VideoCard;
