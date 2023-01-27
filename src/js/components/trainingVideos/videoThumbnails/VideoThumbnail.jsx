/**
 * VideoThumbnail.jsx
 * Created by Andrea Blackwell 12/21/22
 */

import React from "react";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PropTypes from "prop-types";
import PlayButton from "./PlayButton";
import Duration from "./Duration";

const propTypes = {
    showPlay: PropTypes.bool,
    showDuration: PropTypes.bool,
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.string,
    isFeaturedVideo: PropTypes.bool
};

const VideoThumbnail = ({
    showPlay, showDuration, thumbnailUrl, title, duration, isFeaturedVideo
}) => (
    <FlexGridRow>
        <FlexGridCol width={12} className="video-thumbnail__column-container">
            <img src={thumbnailUrl} title={title} alt={title} />
            <FlexGridRow className="video-thumbnail__play-overlay">
                {showPlay && <PlayButton />}
            </FlexGridRow>
            <FlexGridRow className="video-thumbnail__duration-overlay">
                {showDuration && <Duration duration={duration} isFeaturedVideo={isFeaturedVideo} />}
            </FlexGridRow>
        </FlexGridCol>
    </FlexGridRow>
);

VideoThumbnail.propTypes = propTypes;

export default VideoThumbnail;
