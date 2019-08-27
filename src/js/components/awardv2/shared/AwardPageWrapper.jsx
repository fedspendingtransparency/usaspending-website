import React from 'react';
import { startCase } from 'lodash';

import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from "../../../propTypes/index";

const AwardPageWrapper = ({
    awardType,
    awardTypeDescription,
    glossaryLink,
    identifier,
    children
}) => (
    <div className={`award award-${awardType}`}>
        <div className="award__heading">
            <div className="award__heading-text">{startCase(awardTypeDescription)}</div>
            <div className="award__heading-icon">
                <a href={glossaryLink}>
                    <Glossary />
                </a>
            </div>
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
export default AwardPageWrapper;
