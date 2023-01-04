/**
 * TrainingVideosPage.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import TrainingVideosHeading from "./trainingVideosHeading/TrainingVideosHeading";
import FeaturedVideo from "./featuredVideo/FeaturedVideo";
import ListOfVideos from "./listOfVideos/ListOfVideos";

const propTypes = {
    featuredVideo: PropTypes.object,
    videos: PropTypes.array
};

require('pages/trainingVideos/trainingVideos.scss');

const TrainingVideosPage = ({ featuredVideo, videos }) => (
    <PageWrapper
        pageName="TrainingVideos"
        classNames="training-videos-page"
        title="Training Videos"
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content training-videos-content">
            <TrainingVideosHeading />
            <FeaturedVideo featuredVideo={featuredVideo} />
            <ListOfVideos videos={videos} />
        </main>
    </PageWrapper>
);

TrainingVideosPage.propTypes = propTypes;

export default TrainingVideosPage;
