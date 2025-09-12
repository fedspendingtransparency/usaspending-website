/**
  * BaseIcon.jsx
  * Created by Kevin Li 4/25/2016
  */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import IconSingleton from './iconSingleton';

const propTypes = {
    iconClass: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    alt: PropTypes.string
};

const BaseIcon = ({
    iconClass,
    iconName,
    alt = ''
}) => {
    const [icon, setIcon] = useState({
        data: '',
        viewBox: '0 0 0 0'
    });
    const subscription = useRef(null);
    const iconSingleton = IconSingleton;

    const displayIcon = () => {
        // set the state to the correct SVG data
        if ({}.hasOwnProperty.call(iconSingleton.svgCache, iconName)) {
            setIcon(iconSingleton.svgCache[iconName]);
        }
    };

    const svgEvent = () => {
        // icons have loaded, unsubscribe to reduce memory overhead
        iconSingleton.unsubscribe(subscription.current);
        subscription.current = null;

        // display the icon
        displayIcon();
    };

    const prepareIcons = () => {
        // check to see if anyone has started the download process
        if (!iconSingleton.svgLoaded) {
            // no icons available, subscribe to the singleton to be notified when they are ready
            subscription.current = iconSingleton.subscribe(svgEvent);
            // check to see if they are in the process of being downloaded
            if (!iconSingleton.svgRequested) {
                // not requested either, let's request it now
                iconSingleton.downloadIcons();
            }
        }
        else {
            // icons are ready
            displayIcon();
        }
    };

    useEffect(() => {
        prepareIcons();

        return () => {
            if (subscription.current) {
                iconSingleton.unsubscribe(subscription.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <svg
            className={iconClass}
            viewBox={icon.viewBox}
            key={icon.data}
            aria-label={alt}>

            <title>{alt}</title>
            {/* eslint-disable react/no-danger */}
            {/* we need to write the SVG data onto the DOM */}
            <g dangerouslySetInnerHTML={{ __html: icon.data }} />
            {/* eslint-enable react/no-danger */}
        </svg>
    );
};

BaseIcon.propTypes = propTypes;
export default BaseIcon;
