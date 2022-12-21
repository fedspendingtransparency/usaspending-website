/**
 * TrainingVideosContainer.jsx
 * Created by Andrea Blackwell 12/20/2022
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import metadata from 'dataMapping/trainingVideos/playListMetadata';
import VideoMetadata from 'models/v2/video/VideoMetadata';
import TrainingVideosPage from "../../components/trainingVideos/TrainingVideosPage";

const TrainingVideosContainer = () => {
    const videos = {};
    let featuredVideo = {};

    metadata.items.forEach((item) => {
        if (item.id === 'b7SDGhSZ5wM') {
            featuredVideo = Object.create(VideoMetadata);
            featuredVideo.populate(item);
        } else {
            const videoMetadata = Object.create(VideoMetadata);
            videoMetadata.populate(item);
            videos[item.id] = videoMetadata;
        }
    });

    console.log(videos);

    return (
        <TrainingVideosPage
            featuredVideo={featuredVideo}
            videos={videos} />);
};

export default TrainingVideosContainer;

