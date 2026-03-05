/**
 * SearchPageToolBarComponents.jsx
 * Created on 11/18/2025 by Josue Aguilar
 */

import React from "react";

import { getBaseUrl, handleShareOptionClick } from "helpers/socialShare";
import ShareIcon508 from "components/sharedComponents/buttons/ShareIcon508";
import DownloadIconButton508 from "components/sharedComponents/buttons/DownloadButton508";
import FilterAwardToggle from "../FilterAwardToggle";
import NoDownloadHover from "./NoDownloadHover";

const emailSubject = 'Award Search results on USAspending.gov';
const slug = 'search';

const searchPageToolBarComponents = (
    isMobile,
    downloadAvailable,
    downloadInFlight,
    hash,
    setShowFullDownload,
    handleShareDispatch,
    queryParam
) => {
    const toolTipComponent = (!downloadAvailable && hash)
        ? <NoDownloadHover />
        : null;

    /**
     * Shows the full download modal
     */
    const showDownloadModal = () => {
        setShowFullDownload(true);
    };

    const getSlugWithHash = () => `${slug}${window.location.search}`;

    const handleShare = (name) => {
        handleShareOptionClick(name, getSlugWithHash(), {
            subject: emailSubject,
            body: `View search results for federal awards on USAspending.gov:  ${
                getBaseUrl(getSlugWithHash())
            }`
        }, handleShareDispatch);
    };

    return (
        [
            <FilterAwardToggle queryParam={queryParam} key="FilterAwardToggle" />,
            <DownloadIconButton508
                tooltipComponent={toolTipComponent}
                isEnabled={downloadAvailable}
                downloadInFlight={downloadInFlight}
                onClick={showDownloadModal}
                key="DownloadIconButton" />,
            <ShareIcon508
                isEnabled
                url={getBaseUrl(getSlugWithHash())}
                onShareOptionClick={handleShare}
                key="ShareIcon" />
        ]
    );
};

export default searchPageToolBarComponents;
