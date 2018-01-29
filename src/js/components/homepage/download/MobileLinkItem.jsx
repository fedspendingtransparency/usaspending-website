/**
 * MobileLinkItem.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    newTab: PropTypes.bool,
    enabled: PropTypes.bool
};

const MobileLinkItem = (props) => {
    const linkParams = {};
    if (props.newTab) {
        linkParams.target = '_blank';
        linkParams.rel = 'noopener noreferrer';
    }

    let disabledLink = '';
    if (!props.enabled) {
        disabledLink = 'mobile-download__link_disabled';
    }

    return (
        <li
            className="mobile-download__list-item">
            <a
                className={`mobile-download__link ${disabledLink}`}
                href={props.url}
                {...linkParams}>
                <div className="mobile-download__link-icon">
                    <div className={`homepage-download__icon homepage-download__icon_type_${props.code}`} />
                </div>
                <div className="mobile-download__link-label">
                    {props.label}
                </div>
            </a>
        </li>
    );
};

MobileLinkItem.propTypes = propTypes;
export default MobileLinkItem;
