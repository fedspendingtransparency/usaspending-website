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
        <div className="advanced-search-tt__body">
            <p>
                The <strong>Keyword</strong> field currently matches against
                the following attributes:
            </p>
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
    </div>
);

export const DEFTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
           Disaster and Emergency Fund (DEF) Code
        </h3>
        <div className="advanced-search-tt__body">
            <p>
                Disaster Emergency Fund Code (DEF Code) is an accounting attribute used to track the spending of supplemental funding targeting disasters and emergencies.
            </p>
        </div>
    </div>
);


export const withAdvancedSearchTooltip = (props) => () => (
    <TooltipWrapper {...props} />
);
