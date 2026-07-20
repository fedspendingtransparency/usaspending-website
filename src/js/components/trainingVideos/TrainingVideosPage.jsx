/**
 * TrainingVideosPage.jsx
 * Created by Brian Petway 12/05/22
 */

import React from 'react';
import PropTypes from "prop-types";

import PageWrapper from "../../components/sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import BannerPageHeader from "../../components/sharedComponents/header/BannerPageHeader";
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/actions/modal/modalActions';
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';
import ShareDownloadButtonGroup from '../../components/sharedComponents/buttons/ShareDownloadButtonGroup';
import FeaturedVideo from "./featuredVideo/FeaturedVideo";
import ListOfVideos from "./listOfVideos/ListOfVideos";
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import '../../../_scss/pages/trainingVideos/trainingVideos.scss';

const propTypes = {
    featuredVideo: PropTypes.object,
    videos: PropTypes.array
};

// eslint-disable-next-line max-len
const body = "Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube for the latest videos!";

const getEmailSocialShareData = {
    subject: "USAspending.gov Training Videos",
    body: "View the training videos on USAspending.gov: https://www.usaspending.gov/training-videos"
};

const TrainingVideosPage = ({ featuredVideo, videos }) => {
    const dispatch = useDispatch();

    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const handleShare = (name) => {
        handleShareOptionClick(name, "training-videos", getEmailSocialShareData, handleShareDispatch);
    };
    return (
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
                <FlexGridRow className="training-videos__main-share-row">
                    <FlexGridCol className="training-videos__main-share-col">
                        <ShareDownloadButtonGroup
                            url={getBaseUrl("training-videos")}
                            hideDownload
                            onShareClick={handleShare} />
                    </FlexGridCol>
                </FlexGridRow>
                <FeaturedVideo featuredVideo={featuredVideo} />
                <ListOfVideos videos={videos} />
            </main>
        </PageWrapper>
    );
}

TrainingVideosPage.propTypes = propTypes;
export default TrainingVideosPage;
