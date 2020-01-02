/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { SpeechBubble, Glossary } from 'components/sharedComponents/icons/Icons';
import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import ExpandableAwardSection from '../ExpandableAwardSection';
import LineTree from './LineTree';

import { getToolTipBySectionAndAwardType } from '../../../../dataMapping/awards/tooltips';
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
    return (
        <AwardSection type="column" className="award-viz award-description">
            <AwardSectionHeader icon={<SpeechBubble />} tooltip={tooltip} title="Description" tooltipWide={awardType === 'contract'} />
            <div className="award-description__content">
                <ExpandableAwardSection contentClassName="award-description__description" type="secondary" content={description} />
                {naics && psc && (
                    <div className="award-description__naics-psc">
                        <div className="naics-psc__section">
                            <div className="naics-psc__heading">
                                North American Industry Classification System (NAICS)
                                <span>
                                    {/* last word of heading inside the span to prevent the glossary icon from wrapping to its own line by itself */}
                                    Code
                                    <a href={`#/award/${awardId}/?glossary=naics`}>
                                        <Glossary alt="View glossary definition of NAICS" />
                                    </a>
                                </span>
                            </div>
                            <LineTree type="naics" data={naics} />
                        </div>
                        <div className="naics-psc__section naics-psc__section_psc">
                            <div className="naics-psc__section">
                                <div className="naics-psc__heading">
                                    Product or Service Code
                                    <span>
                                        {/* last word of heading inside the span to prevent the glossary icon from going to its own line by itself */}
                                        (PSC)
                                        <a href={`#/award/${awardId}/?glossary=productservice-code-psc`}>
                                            <Glossary alt="View glossary definition of Product/Service Code (PSC)" />
                                        </a>
                                    </span>
                                </div>
                                <LineTree type="psc" data={psc} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AwardSection>
    );
};

AwardDescription.propTypes = propTypes;
export default AwardDescription;
