/**
 * VideoThumbnail.jsx
 * Created by Andrea Blackwell 12/21/22
 */

import React from "react";
import PropTypes from "prop-types";
import PlayButton from "./PlayButton";
import Duration from "./Duration";

const propTypes = {
    showPlay: true,
    showDuration: true,
    thumbnailUrl: ''
};

const VideoThumbnail = ({ showPlay, showDuration, thumbnailUrl }) => {
    console.log(thumbnailUrl)
    return (
        <>
            <img src={thumbnailUrl} alt="VideoCard thumbnail placeholder alt text" />
            {showPlay && <PlayButton />}
            {showDuration && <Duration />}
        </>
    );
}

VideoThumbnail.propTypes = propTypes;

export default VideoThumbnail;
