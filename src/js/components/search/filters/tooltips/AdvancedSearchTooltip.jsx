/**
 * KeywordHover.jsx
 * Created by Kevin Li 12/4/17
 */

import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';

export const KeyWordTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
           Keyword
        </h3>
        <span>
            The <strong>Keyword</strong> field currently matches against
            the following attributes:
        </span>
        <ul className="advanced-search-tt__list">
            <li>Recipient Name</li>
            <li>Recipient DUNS</li>
            <li>Recipient Parent DUNS</li>
            <li>NAICS code and description</li>
            <li>PSC code and description</li>
            <li>PIID (prime award only)</li>
            <li>FAIN (prime award only)</li>
            <li>URI</li>
            <li>Award Description</li>
        </ul>
    </div>
);


export const withAdvancedSearchTooltip = (props) => () => (
    <TooltipWrapper {...props} />
);
