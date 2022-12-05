/**
 * TrainingVideosPage.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import TrainingVideosHeading from "./trainingVideosHeading/TrainingVideosHeading";
import HighlightedVideo from "./highlightedVideo/HighlightedVideo";
import TrainingVideosFilters from "./trainingVideosFilters/TrainingVideosFilters";
import ListOfVideos from "./listOfVideos/ListOfVideos";

const TrainingVideosPage = () => (
    <PageWrapper
        pageName="TrainingVideos"
        classNames="training-videos"
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content training-videos-content">
            <div>
                TRAINING VIDEOS PAGE
            </div>
            <TrainingVideosHeading />
            <HighlightedVideo />
            <TrainingVideosFilters />
            <ListOfVideos />
        </main>
    </PageWrapper>
);

export default TrainingVideosPage;
