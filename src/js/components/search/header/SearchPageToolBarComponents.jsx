/**
 * SearchPageToolBarComponents.jsx
 * Created on 11/18/2025 by Josue Aguilar
 */

import React from "react";
import { DownloadIconButton, ShareIcon } from "data-transparency-ui";

import { getBaseUrl, handleShareOptionClick } from "helpers/socialShare";
import FilterAwardToggle from "../FilterAwardToggle";
import NoDownloadHover from "./NoDownloadHover";

const emailSubject = 'Award Search results on USAspending.gov';
const slug = 'search/';

const searchPageToolBarComponents = (
    isMobile,
    downloadAvailable,
    downloadInFlight,
    hash,
    setShowFullDownload,
    handleShareDispatch,
    queryParam
) => {
    const shareIconClassName = !isMobile ? "margin-right" : "";
    const toolTipComponent = (!downloadAvailable && hash)
        ? <NoDownloadHover />
        : null;

    /**
     * Shows the full download modal
     */
    const showDownloadModal = () => {
        setShowFullDownload(true);
    };

    const getSlugWithHash = () => {
        if (hash) {
            return `${slug}?hash=${hash}`;
        }
        return slug;
    };

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
            <FilterAwardToggle queryParam={queryParam} />,
            <ShareIcon
                isEnabled
                url={getBaseUrl(getSlugWithHash())}
                onShareOptionClick={handleShare}
                classNames={shareIconClassName}
                key="ShareIcon" />,
            <DownloadIconButton
                tooltipPosition="left"
                tooltipComponent={toolTipComponent}
                isEnabled={downloadAvailable}
                downloadInFlight={downloadInFlight}
                onClick={showDownloadModal}
                key="DownloadIconButton" />
        ]
    );
};

export default searchPageToolBarComponents;
