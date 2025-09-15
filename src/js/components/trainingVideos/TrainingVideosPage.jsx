/**
 * TrainingVideosPage.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";

import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import FeaturedVideo from "./featuredVideo/FeaturedVideo";
import ListOfVideos from "./listOfVideos/ListOfVideos";
import ContentPageHeader from '../sharedComponents/header/ContentPageHeader';
import { getBaseUrl } from '../../helpers/socialShare';

const propTypes = {
    featuredVideo: PropTypes.object,
    videos: PropTypes.array
};

require('pages/trainingVideos/trainingVideos.scss');

const TrainingVideosPage = ({ featuredVideo, videos }) => (
    <PageWrapper
        pageName="TrainingVideos"
        classNames="training-videos-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content training-videos-content">
            <ContentPageHeader
                className="training-videos"
                kicker="RESOURCES"
                title="Training Videos"
                body="Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube channel for the latest videos!"
                image="img/youtube-page/youtube-landing-page-hero-image@2x.webp"
                shareOptions={{
                    emailSubject: "Training Videos for USAspending.gov",
                    emailBody: ` Watch training videos about USAspending.gov: ${getBaseUrl("training-videos")}`
                }}
                slug="training-videos" />
            <FeaturedVideo featuredVideo={featuredVideo} />
            <ListOfVideos videos={videos} />
        </main>
    </PageWrapper>
);

TrainingVideosPage.propTypes = propTypes;
export default TrainingVideosPage;
