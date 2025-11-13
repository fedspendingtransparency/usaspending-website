/**
 * EntityCDTooltip.jsx
 * Created by Kevin Li 10/31/17
 */

import React, { useState } from 'react';
import { TooltipWrapper } from "data-transparency-ui";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";

import { CDTooltip } from "../tooltips/AdvancedSearchTooltip";

const propTypes = {
    isDistrictEnabled: PropTypes.bool
};

const EntityCDTooltip = ({ isDistrictEnabled }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const warningId = `location-field-cd-${uniqueId()}`;
    const hideWarning = showTooltip ? '' : 'hide';

    return (
        <div className="location-item__cd geo-entity-item">
            <span
                className={`location-label__with-tt ${
                    isDistrictEnabled === false ? "disabled" : ""
                }`}>
                            CONGRESSIONAL DISTRICT (US ONLY)
            </span>
            <div>
                <TooltipWrapper
                    controlledProps={{
                        isControlled: true,
                        showTooltip: () => {
                            setShowTooltip(true);
                        },
                        closeTooltip: () => {
                            setShowTooltip(false);
                        },
                        isVisible: false
                    }}
                    className="advanced-search__cd-tooltip"
                    icon="info" >
                    {showTooltip &&
                        <div
                            className={`geo-cd ${hideWarning}`}
                            id={warningId}
                            aria-hidden={hideWarning === 'hide'}>
                            <div className="cd-tooltip">
                                <div className="cd-content">
                                    <div className="tooltip-pointer top" />
                                    <div className="message">
                                        {<CDTooltip />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </TooltipWrapper>
            </div>
        </div>
    );
};

EntityCDTooltip.propTypes = propTypes;
export default EntityCDTooltip;
