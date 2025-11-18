import React from "react";
import { DownloadIconButton, ShareIcon } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SubawardDropdown from "./SubawardDropdown";
import { setSearchViewSubaward, setSpendingLevel } from
    "../../redux/actions/search/searchViewActions";
import NoDownloadHover from "./header/NoDownloadHover";
import { getBaseUrl, handleShareOptionClick } from "../../helpers/socialShare";

const emailSubject = 'Award Search results on USAspending.gov';
const slug = 'search/';

/* eslint-disable max-len */
const infoSectionContent =
    <>
        <div className="explainer-text__first-column">
            <FontAwesomeIcon icon="info-circle" className="explainer-text__info-icon" />
        </div>
        <div className="explainer-text__second-column">
            <p>Please note that results displayed will vary depending on the filter that’s selected here.</p>
            <p>For more information, read the "About" sections at the bottom of each filter or the "Data sources and methodology" sections at the bottom of each result module.</p>
        </div>
    </>;
/* eslint-enable max-len */

const searchPageToolBarComponents = (
    isMobile,
    downloadAvailable,
    downloadInFlight,
    hash,
    setShowFullDownload,
    handleShareDispatch
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
            <SubawardDropdown
                size="sm"
                label="Filter by:"
                enabled
                setSearchViewSubaward={setSearchViewSubaward}
                selectedValue="awards"
                setSpendingLevel={setSpendingLevel}
                infoSection
                infoSectionContent={infoSectionContent}
                key="SubawardDropdown" />,
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
