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
    duration: PropTypes.string
};

const VideoThumbnail = ({
    showPlay, showDuration, thumbnailUrl, title, duration
}) => (
    <FlexGridRow>
        <FlexGridCol width={12}>
            <img src={thumbnailUrl} title={title} alt={title} />
            <div className="list-of-videos__thumbnail-overlays">
                {showPlay && <PlayButton />}
                {showDuration && <Duration duration={duration} />}
            </div>
        </FlexGridCol>
    </FlexGridRow>
);

VideoThumbnail.propTypes = propTypes;
export default VideoThumbnail;
