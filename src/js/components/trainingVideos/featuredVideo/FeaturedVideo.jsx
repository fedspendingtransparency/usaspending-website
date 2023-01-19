/**
 * FeaturedVideo.jsx
 * Created by Brian Petway 12/05/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { showTrainingVideoModal } from 'redux/actions/modal/modalActions';
import { FlexGridRow, FlexGridCol, ShareIcon } from 'data-transparency-ui';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { handleShareOptionClick } from 'helpers/socialShare';
import { throttle } from 'lodash';
import VideoThumbnail from '../videoThumbnails/VideoThumbnail';


const propTypes = {
    featuredVideo: PropTypes.array,
    url: PropTypes.func
};

const FeaturedVideo = ({ featuredVideo }) => {
    const slug = "https://www.youtube.com/watch?v=b7SDGhSZ5wM";
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const dispatch = useDispatch();

    const onShareClick = (name) => {
        const emailSubject = `TUTORIAL: How to Find Government Spending to Your State`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Watch this video about USAspending.gov: ${slug}`
        };
        handleShareOptionClick(name, slug, emailArgs);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const launchModal = (e) => {
        e.persist();
        dispatch(showTrainingVideoModal({
            url: featuredVideo.thumbnails.maxres.url, modalType: 'training-videos', title: featuredVideo.title, description: featuredVideo.description, publishedAt: featuredVideo.publishedAt, duration: featuredVideo.duration, id: featuredVideo.id
        }));
    };
    return (
        <section className="featured-video__section">
            <div
                className="grid-content">
                <FlexGridRow>
                    <FlexGridCol width={5} desktop={5} tablet={12} mobile={12}>
                        <div className="featured-video__text">
                            <div className="featured-video__heading">
                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                <div
                                    className="featured-video__headline"
                                    onKeyDown={launchModal}
                                    onClick={launchModal} >
                                    Learn how USAspending.gov
                                    <br />
                                    got started
                                </div>
                                <div className="featured-video__inline">
                                    <div className="featured-video__publishedAt">{ featuredVideo.publishedAt }</div>
                                    <div className="training-video-feature__column-share-icon">
                                        <ShareIcon
                                            url="https://www.youtube.com/watch?v=b7SDGhSZ5wM"
                                            tabIndex={0}
                                            onShareOptionClick={onShareClick}
                                            colors={{ backgroundColor: "#1b2b85", color: "#DFE1E2" }}
                                            dropdownDirection={isMobile ? 'right' : 'left'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FlexGridCol>
                    <FlexGridCol
                        width={7}
                        desktop={7}
                        tablet={12}
                        mobile={12}
                        onKeyDown={launchModal}
                        onClick={launchModal} >
                        <VideoThumbnail
                            tabIndex="0"
                            thumbnailUrl={featuredVideo.thumbnails.maxres.url}
                            duration={featuredVideo.duration}
                            url={VideoThumbnail.url}
                            showPlay
                            showDuration
                            title={featuredVideo.title}
                            alt={featuredVideo.title} />
                    </FlexGridCol>
                </FlexGridRow>
            </div>
        </section>
    );
};

FeaturedVideo.propTypes = propTypes;
export default FeaturedVideo;
