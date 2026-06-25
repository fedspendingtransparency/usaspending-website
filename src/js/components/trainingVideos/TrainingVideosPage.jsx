/**
 * TrainingVideosPage.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";

import PageWrapper from "../../components/sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import BannerPageHeader from "../../components/sharedComponents/header/BannerPageHeader";
import FeaturedVideo from "./featuredVideo/FeaturedVideo";
import ListOfVideos from "./listOfVideos/ListOfVideos";

const propTypes = {
    featuredVideo: PropTypes.object,
    videos: PropTypes.array
};

// eslint-disable-next-line max-len
const body = "Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube for the latest videos!";

require('../../../_scss/pages/trainingVideos/trainingVideos.scss');

const TrainingVideosPage = ({ featuredVideo, videos }) => (
    <PageWrapper
        pageName="TrainingVideos"
        classNames="training-videos-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content training-videos-content">
            <BannerPageHeader
                kicker="RESOURCES"
                title="Training Videos"
                body={body}
                faIcon="graduation-cap"
                primaryColor="#00687D"
                secondaryColor="#0081A1" />
            <FeaturedVideo featuredVideo={featuredVideo} />
            <ListOfVideos videos={videos} />
        </main>
    </PageWrapper>
);

TrainingVideosPage.propTypes = propTypes;
export default TrainingVideosPage;
