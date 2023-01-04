/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol, Picker } from "data-transparency-ui";
import VideoCard from '../videoCard/VideoCard';

const propTypes = {
    videos: PropTypes.array
};

const ListOfVideos = ({ videos }) => {
    const onClick = () => {
        console.debug("clicked card!!!");
    };

    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            onClick();
        }
    };
    return (
        <section className="list-of-videos__section">
            <div className="grid-content">
                <FlexGridRow className="list-of-videos__sort">
                    <FlexGridCol width={12} className="video-sort">
                        <div className="video-sort-label">Sort By: </div>
                        <Picker
                            className="video-sort-list"
                            options={[{ name: 'Newest', value: "Newest" },
                                { name: 'Oldest', value: "Oldest" },
                                { name: 'Shortest', value: "Shortest" },
                                { name: 'Longest', value: "Longest" }]}
                            dropdownDirection="right"
                            backgroundColor="#ffffff"
                            selectedOption="Newest" />
                    </FlexGridCol>
                </FlexGridRow>
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
                                title={video.title}
                                duration={video.duration}
                                publishedAt={video.publishedAt}
                                description={video.description}
                                onClick={onClick}
                                onKeyUp={onKeyUp} />
                        </FlexGridCol>))
                    }
                </FlexGridRow>
            </div>
        </section>);
};

ListOfVideos.propTypes = propTypes;
export default ListOfVideos;

