/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/20/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import metadata from 'dataMapping/videoLanding/playListMetadata';

export const VideoLandingContainer = (props) => {
    console.log(metadata);
    return (<>{props.children}</>);
};

