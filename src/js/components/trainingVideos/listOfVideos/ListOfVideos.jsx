/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { showTrainingVideoModal } from 'redux/actions/modal/modalActions';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import VideoCard from '../videoCard/VideoCard';

const propTypes = {
    videos: PropTypes.array
};

const ListOfVideos = ({ videos }) => {
    const dispatch = useDispatch();
    return (
        <section className="list-of-videos__section">
            <div className="grid-content">
                <FlexGridRow hasGutter gutterSize="lg">
                    {videos.map((video) => (
                        <FlexGridCol
                            key={video.id}
                            desktopxl={4}
                            desktop={6}
                            tablet={12}
                            mobile={12}
                            className="list-of-videos__video">
                            <VideoCard
                                tabIndex="0"
                                key={video.id}
                                thumbnailUrl={video.thumbnails.maxres.url}
                                id={video.id}
                                title={video.title}
                                duration={video.duration}
                                publishedAt={video.publishedAt}
                                description={video.description}
                                onClick={(e) => {
                                    e.persist();
                                    dispatch(showTrainingVideoModal({
                                        url: video.thumbnails.maxres.url, modalType: 'training-videos', title: video.title, description: video.description, publishedAt: video.publishedAt, duration: video.duration, id: video.id
                                    }));
                                }} />
                        </FlexGridCol>))
                    }
                </FlexGridRow>
            </div>
        </section>);
};

ListOfVideos.propTypes = propTypes;
export default ListOfVideos;

