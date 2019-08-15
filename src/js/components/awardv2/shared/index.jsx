import React from 'react';
import { startCase } from 'lodash';

import { AWARD_SECTION_PROPS, AWARD_PAGE_WRAPPER_PROPS } from "../../../propTypes/index";

export const AwardPageWrapper = ({
    awardType,
    awardTypeDescription,
    glossaryLink,
    identifier,
    children
}) => (
    <div className={`award award-${awardType}`}>
        <div className="award__heading">
            <div className="award__heading-text">{startCase(awardTypeDescription)}</div>
            <div className="award__heading-icon">{glossaryLink}</div>
            <div className="award__heading-id">
                <div className="award__heading-label">{identifier ? 'PIID' : ''}</div>
                <div>{identifier}</div>
            </div>
            <hr />
        </div>
        {children}
    </div>
);

AwardPageWrapper.propTypes = AWARD_PAGE_WRAPPER_PROPS;

const classMap = {
    row: "award__row",
    column: "award__col"
};

export const AwardSection = ({
    id,
    type,
    className,
    children
}) => <div id={id} className={`${classMap[type]} ${className}`}>{children}</div>;

AwardSection.propTypes = AWARD_SECTION_PROPS;
