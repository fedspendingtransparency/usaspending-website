/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";
import {FlexGridRow, FlexGridCol, Picker} from "data-transparency-ui";
import VideoCard from '../videoCard/VideoCard';

const propTypes = {
    videos: PropTypes.array
};

const ListOfVideos = ({ videos }) => (
    <section className="list-of-videos__section">
        <div className="grid-content">
            <FlexGridRow>
                <FlexGridCol width={12}>
                    <Picker
                        className="video-sort"
                        options={[{ name: 'Newest', value: "Newest"},
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
                        desktop={4}
                        tablet={6}
                        mobile={12}
                        className="list-of-videos__video">
                        <VideoCard
                            key={video.id}
                            thumbnailUrl={video.thumbnails.standard.url}
                            title={video.title}
                            duration={video.duration}
                            publishedAt={video.publishedAt}
                            description={video.description} />
                    </FlexGridCol>))
                }
            </FlexGridRow>
        </div>
    </section>);

ListOfVideos.propTypes = propTypes;
export default ListOfVideos;
