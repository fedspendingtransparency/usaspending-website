/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FlexGridRow, FlexGridCol, NoResultsMessage } from 'data-transparency-ui';

import { SpeechBubble, Glossary } from 'components/sharedComponents/icons/Icons';
import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import ExpandableAwardSection from '../ExpandableAwardSection';
import LineTree from './LineTree';

import { getToolTipBySectionAndAwardType } from '../../../../dataMapping/award/tooltips';
import { AWARD_TYPE_PROPS } from "../../../../propTypes";

const propTypes = {
    awardId: PropTypes.string,
    description: PropTypes.string,
    naics: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // string for IDVs
    psc: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // string for IDVs
    awardType: AWARD_TYPE_PROPS
};

const AwardDescription = ({
    awardId,
    description,
    naics = null,
    psc = null,
    awardType
}) => {
    const tooltip = getToolTipBySectionAndAwardType('description', awardType);
    const isTooltipWide = (awardType === 'contract' || awardType === 'idv');
    return (
        <AwardSection type="column" className="award-viz award-description">
            <AwardSectionHeader icon={<SpeechBubble />} tooltip={tooltip} title="Description" tooltipWide={isTooltipWide} />
            <div className="award-description__content">
                {description === "--" ? <NoResultsMessage /> : <ExpandableAwardSection contentClassName="award-description__description" type="secondary" content={description} />}
                {naics && psc && (
                    <FlexGridRow hasGutter className="award-description__naics-psc">
                        <FlexGridCol tablet={6} className="naics-psc__section">
                            <div className="naics-psc__heading">
                                North American Industry Classification System (NAICS)
                                <span>
                                    {/* last word of heading inside the span to prevent the glossary icon from wrapping to its own line by itself */}
                                    Code
                                    <Link to={`/award/${awardId}?glossary=naics`}>
                                        <Glossary alt="View glossary definition of NAICS" />
                                    </Link>
                                </span>
                            </div>
                            {Object.keys(naics).length === 0 ? <NoResultsMessage /> : <LineTree type="naics" data={naics} />}
                        </FlexGridCol>
                        <FlexGridCol tablet={6} className="naics-psc__section">
                            <div className="naics-psc__heading psc__extra-margin">
                                Product or Service Code
                                <span>
                                    {/* last word of heading inside the span to prevent the glossary icon from going to its own line by itself */}
                                    (PSC)
                                    <Link to={`/award/${awardId}?glossary=product-or-service-code-psc`}>
                                        <Glossary alt="View glossary definition of Product or Service Code (PSC)" />
                                    </Link>
                                </span>
                            </div>
                            {/* if psc is empty object, then dtui error, else linetree */}
                            {Object.keys(psc).length === 0 ? <NoResultsMessage /> : <LineTree type="psc" data={psc} />}
                        </FlexGridCol>
                    </FlexGridRow>
                )}
            </div>
        </AwardSection>
    );
};

AwardDescription.propTypes = propTypes;
export default AwardDescription;
