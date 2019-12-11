import React from 'react';

import { awardTypeCodes } from 'dataMapping/search/awardType';
import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from '../../../propTypes/index';

const AwardPageWrapper = ({
    awardType,
    title,
    lastModifiedDateLong,
    glossaryLink,
    overviewType,
    identifier,
    idLabel = "PIID",
    children
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
                <div className="award__last-modified">
                Last Modified On:{" "}
                    <span className="award__last-modified award__last-modified_date">
                        {lastModifiedDateLong}
                    </span>
                </div>
            </div>
            <hr />
            {children}
        </div>
    );
};

AwardPageWrapper.propTypes = AWARD_PAGE_WRAPPER_PROPS;
export default AwardPageWrapper;
