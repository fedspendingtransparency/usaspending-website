/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/20/2022
 */

import React from 'react';
import metadata from 'dataMapping/videoLanding/playListMetadata';
import VideoMetadata from 'models/v2/video/VideoMetadata';

export const VideoLandingContainer = (props) => {
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
    return (<>{props.children}</>);
};

