/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import VideoCard from '../videoCard/VideoCard';


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
                <FlexGridRow hasGutter gutterSize="lg">
                    {videos.map((video, index) => (
                        <FlexGridCol
                            key={index}
                            width={4}
                            desktopxl={4}
                            desktop={6}
                            tablet={12}
                            mobile={12}
                            className="list-of-videos__video">
                            <VideoCard
                                tabIndex="0"
                                key={`video-${index}`}
                                thumbnailUrl={video.thumbnails.standard.url}
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
        </section>); };

export default ListOfVideos;
