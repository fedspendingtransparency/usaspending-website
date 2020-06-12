import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';

import { awardTypeCodes } from 'dataMapping/search/awardType';
import { getCovidFromFileC } from 'helpers/covid19Helper';

import GlobalConstants from 'GlobalConstants';
import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from '../../../propTypes/index';
import AwardStatus from './AwardStatus';

const isCaresReleased = GlobalConstants.CARES_ACT_RELEASED;

const CovidFlagTooltip = () => (
    <p>Yo wut up</p>
);

const AwardPageWrapper = ({
    fileC,
    awardType,
    title,
    glossaryLink,
    overviewType,
    identifier,
    idLabel = "PIID",
    children,
    dates
}) => {
    console.log("fileC", fileC);
    const covidDefC = isCaresReleased
        ? getCovidFromFileC(fileC?.obligations)
        : [];
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
                    {covidDefC.length > 0 &&
                        <TooltipWrapper className="award-summary__covid-19-flag" tooltipComponent={<CovidFlagTooltip />}>
                            <span className="covid-spending-flag">
                                COVID-19 Response
                            </span>
                        </TooltipWrapper>
                    }
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
