/**
 * MobileLinks.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import { downloadOptions } from 'dataMapping/navigation/menuOptions';

import MobileLinkItem from './MobileLinkItem';

const MobileLinks = () => {
    const leftItems = downloadOptions.slice(0, 3).map((item) => (
        <MobileLinkItem
            {...item}
            key={item.code} />
    ));

    const rightItems = downloadOptions.slice(3).map((item) => (
        <MobileLinkItem
            {...item}
            key={item.code} />
    ));

    return (
        <div className="mobile-download">
            <ul className="mobile-download__list mobile-download__list_align_left">
                {leftItems}
            </ul>
            <ul className="mobile-download__list mobile-download__list_align_right">
                {rightItems}
            </ul>
        </div>
    );
};

export default MobileLinks;
