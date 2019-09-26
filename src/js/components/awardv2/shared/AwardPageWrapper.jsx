import React, { Fragment } from 'react';
import { startCase } from 'lodash';

import { Glossary } from '../../sharedComponents/icons/Icons';
import { AWARD_PAGE_WRAPPER_PROPS } from '../../../propTypes/index';
import { financialAssistanceAwardTypes } from '../../../models/v2/awardsV2/BaseFinancialAssistance';

const AwardPageWrapper = ({
    awardType,
    awardTypeDescription,
    lastModifiedDateLong,
    glossaryLink,
    identifier,
    children
}) => {
    const isFinancialAward = financialAssistanceAwardTypes.includes(awardType);
    return (
        <div className={`award award-${awardType}`}>
            <div className="award__heading">
                <div className="award__info">
                    <div className="award__heading-text">{startCase(awardTypeDescription)}</div>
                    <div className="award__heading-icon">
                        <a href={glossaryLink}>
                            <Glossary />
                        </a>
                    </div>
                    <div className="award__heading-id">
                        {isFinancialAward && (
                            <Fragment>
                                <div className="award__heading-label--fain">FAIN</div>
                                <div>{identifier[0]}</div>
                                <div className="award__heading-label--uri"> URI</div>
                                <div>{identifier[1] ? identifier[1] : '--' }</div>
                            </Fragment>
                        )}
                        {!isFinancialAward && (
                            <Fragment>
                                <div className="award__heading-label">{identifier ? 'PIID' : ''}</div>
                                <div>{identifier}</div>
                            </Fragment>
                        )}
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
