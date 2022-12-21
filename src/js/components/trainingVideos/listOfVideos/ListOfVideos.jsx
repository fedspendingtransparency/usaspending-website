/**
 * ListOfVideos.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';

const ListOfVideos = ({ videos }) => {
    videos.sort((a, b) => {
        const nameA = a.publishedAt();
        const nameB = b.publishedAt();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return (
        <section className="list-of-videos__section">
            <div className="grid-content">
                {videos.forEach((video) => {
                    return (

                    )
                })}
                LIST OF VIDEOS SECTION
            </div>
        </section>
    );
};

export default ListOfVideos;
