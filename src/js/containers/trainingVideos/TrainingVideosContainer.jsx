/**
 * TrainingVideosContainer.jsx
 * Created by Andrea Blackwell 12/20/2022
 */

import React from 'react';
import VideoMetadata from 'models/v2/video/VideoMetadata';
import metadata from '../../../config/training_videos/playListMetadata';
import TrainingVideosPage from "../../components/trainingVideos/TrainingVideosPage";

const TrainingVideosContainer = () => {
    const videos = [];
    let featuredVideo = {};
    const featuredVideoId = 'b7SDGhSZ5wM';

    metadata.items.forEach((item) => {
        if (item.id === featuredVideoId) {
            featuredVideo = Object.create(VideoMetadata);
            featuredVideo.populate(item);
        } else {
            const videoMetadata = Object.create(VideoMetadata);
            videoMetadata.populate(item);
            videos.push(videoMetadata);
        }
    });

    return (
        <TrainingVideosPage
            featuredVideo={featuredVideo}
            videos={videos} />);
};

export default TrainingVideosContainer;

