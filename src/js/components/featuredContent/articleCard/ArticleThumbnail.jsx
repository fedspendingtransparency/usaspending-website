/**
 * ArticleThumbnail.jsx
 * Created by Nick Torres 9/17/2025
 */

import React from "react";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PropTypes from "prop-types";


const propTypes = {
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string
};

const ArticleThumbnail = ({
    thumbnailUrl, title
}) => (
    <FlexGridRow>
        <FlexGridCol width={12} className="video-thumbnail__column-container">
            <img src={thumbnailUrl} title={title} alt={title} />
        </FlexGridCol>
    </FlexGridRow>
);

ArticleThumbnail.propTypes = propTypes;

export default ArticleThumbnail;
