import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';
import { Link } from 'react-router-dom';

import { awardTypeCodes } from 'dataMapping/search/awardType';

import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from '../../../propTypes/index';
import AwardStatus from './AwardStatus';
import { CovidFlagTooltip } from '../shared/InfoTooltipContent';

const AwardPageWrapper = ({
    // defCodes from api are already filtered down to covid codes only.
    defCodes,
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
                        <Link to={glossaryLink}>
                            <Glossary alt={glossaryTitleText} />
                        </Link>
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
            {defCodes.length > 0 &&
            <TooltipWrapper className="award-summary__covid-19-flag" tooltipComponent={<CovidFlagTooltip codes={defCodes} />}>
                <span className="covid-spending-flag">
                                Includes COVID-19 Spending
                </span>
            </TooltipWrapper>
            }
            <hr />
            {children}
        </div>
    );
};

AwardPageWrapper.propTypes = AWARD_PAGE_WRAPPER_PROPS;
export default AwardPageWrapper;
