/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import ShareDownloadButtonGroup from 'components/sharedComponents/buttons/ShareDownloadButtonGroup';

const propTypes = {
    url: PropTypes.string,
    onShareClick: PropTypes.func,
    downloadLink: PropTypes.string
};

const IntroSection = ({
    url,
    onShareClick,
    downloadLink
}) => (
    <FlexGridRow>
        <FlexGridCol width={10}>
            <div className="body__content intro__content interactive-data-sources-intro-section">
                <p data-testid="paragraphText">
                    USAspending.gov links data from many government systems, including agency financial systems and governmentwide award systems. Scroll below to learn more about these systems, as well as the context for this historic initiative to provide federal spending transparency.
                </p>
            </div>
        </FlexGridCol>
        <FlexGridCol width={2}>
            <ShareDownloadButtonGroup
                url={url}
                downloadLink={downloadLink}
                onShareClick={onShareClick} />
        </FlexGridCol>
    </FlexGridRow>
                    
);

IntroSection.propTypes = propTypes;
export default IntroSection;
