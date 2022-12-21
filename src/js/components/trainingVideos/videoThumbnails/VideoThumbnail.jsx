/**
 * VideoThumbnail.jsx
 * Created by Andrea Blackwell 12/21/22
 */

import React from "react";
import PropTypes from "prop-types";
import PlayButton from "./PlayButton";
import Duration from "./Duration";

const propTypes = {
    showPlay: PropTypes.bool,
    showDuration: PropTypes.bool,
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string
};

const VideoThumbnail = ({
    showPlay, showDuration, thumbnailUrl, title
}) => (
    <>
        <img src={thumbnailUrl} alt={title} />
        {showPlay && <PlayButton />}
        {showDuration && <Duration />}
    </>
);

VideoThumbnail.propTypes = propTypes;

export default VideoThumbnail;
