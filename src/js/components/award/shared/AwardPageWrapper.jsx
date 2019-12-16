import React from 'react';

import { awardTypeCodes } from 'dataMapping/search/awardType';
import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from '../../../propTypes/index';
import AwardStatus from './AwardStatus';

const AwardPageWrapper = ({
    awardType,
    title,
    glossaryLink,
    overviewType,
    identifier,
    idLabel = "PIID",
    children,
    dates
}) => {
    const glossaryTitleText = awardTypeCodes[overviewType] ?
        `View glossary definition of ${awardTypeCodes[overviewType]}` :
        'View glossary definition';
    return (
        <div className={`award award-${awardType}`}>
            <div className="award__heading">
                <div className="award__info">
                    <h2 className="award__heading-text">{title}</h2>
                    <div className="award__heading-icon">
                        <a href={glossaryLink}>
                            <Glossary alt={glossaryTitleText} />
                        </a>
                    </div>
                    <div className="award__heading-id">
                        <h3>{idLabel}</h3>
                        <p>{identifier}</p>
                    </div>
                </div>
                <AwardStatus
                    awardType={awardType}
                    dates={dates} />
            </div>
            <hr />
            {children}
        </div>
    );
};

AwardPageWrapper.propTypes = AWARD_PAGE_WRAPPER_PROPS;
export default AwardPageWrapper;
