/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import VideoCard from '../videoCard/VideoCard';


const ListOfVideos = ({ videos }) => (
    <section className="list-of-videos__section">
        <div className="grid-content">
            <FlexGridRow hasGutter gutterSize="lg">
                {videos.map((video, index) => (
                    <FlexGridCol
                        width={3}
                        desktop={3}
                        className="list-of-videos__video">
                        <VideoCard
                            key={`video-${index}`}
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

export default ListOfVideos;
