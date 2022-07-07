import React, { useEffect, useState } from 'react';
import { TooltipWrapper } from 'data-transparency-ui';
import { Link } from 'react-router-dom';
import { awardTypeCodes } from 'dataMapping/search/awardType';
import { useDefCodes } from 'containers/covid19/WithDefCodes';
import { getAwardHistoryCounts } from "../../../helpers/awardHistoryHelper";
import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from '../../../propTypes/index';
import AwardStatus from './AwardStatus';
import { CovidFlagTooltip, UnlinkedTooltip } from '../shared/InfoTooltipContent';

const AwardPageWrapper = ({
    allDefCodes,
    awardType,
    title,
    glossaryLink,
    overviewType,
    identifier,
    idLabel = "PIID",
    children,
    dates,
    unlinked
}) => {
    const glossaryTitleText = awardTypeCodes[overviewType] ?
        `View glossary definition of ${awardTypeCodes[overviewType]}` :
        'View glossary definition';

    const [, areDefCodesLoading, defCodes] = useDefCodes();
    const [covidDefCodes, setCovidDefCodes] = useState(null);

    useEffect(() => {
        if (!areDefCodesLoading) {
            setCovidDefCodes(defCodes.filter((c) => c.disaster === 'covid_19' && allDefCodes.indexOf(c.code) > -1).map((code) => code.code));
        }
    }, [areDefCodesLoading, allDefCodes, defCodes]);

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
            {covidDefCodes && covidDefCodes.length > 0 &&
            <TooltipWrapper className="award-summary__covid-19-flag" tooltipComponent={<CovidFlagTooltip codes={covidDefCodes} />}>
                <span className="covid-spending-flag">
                                Includes COVID-19 Spending
                </span>
            </TooltipWrapper>
            }
            {unlinked &&
            <TooltipWrapper className="award-summary__unlinked-flag" tooltipComponent={<UnlinkedTooltip />}>
                <span className="unlinked-flag">
                                Unlinked Award
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
