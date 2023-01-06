/**
 * FeaturedVideo.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import VideoThumbnail from "../videoThumbnails/VideoThumbnail";

const propTypes = {
    featuredVideo: PropTypes.object
};

const FeaturedVideo = ({ featuredVideo }) => (
    <section className="featured-video__section">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
            className="grid-content"
            /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
            tabIndex="0"
            onKeyDown={() => console.log("launch modal here")}
            onClick={() => console.log("launch modal here")}>
            <FlexGridRow>
                <FlexGridCol width={5} desktop={5} tablet={12} mobile={12}>
                    <div className="featured-video__text">
                        <div className="featured-video__heading">
                            <div className="featured-video__headline">
                                Learn how USAspending.gov
                                <br />
                                got started
                            </div>
                            <div className="featured-video__publishedAt">{ featuredVideo.publishedAt }</div>
                        </div>
                    </div>
                </FlexGridCol>
                <FlexGridCol width={7} desktop={7} tablet={12} mobile={12}>
                    <VideoThumbnail
                        thumbnailUrl={featuredVideo.thumbnails.maxres.url}
                        duration={featuredVideo.duration}
                        showPlay
                        showDuration
                        title={featuredVideo.title}
                        alt={featuredVideo.title} />
                </FlexGridCol>
            </FlexGridRow>
        </div>
    </section>
);

FeaturedVideo.propTypes = propTypes;
export default FeaturedVideo;
