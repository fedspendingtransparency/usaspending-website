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

import { getToolTipBySectionAndAwardType } from '../../../../dataMapping/awardsv2/tooltips';
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
    const isIdv = (awardType === 'idv');
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
                                North American Industry Classification System (NAICS) Code
                                <span className="naics-psc__icon">
                                    <a href={`#/award/${awardId}/?glossary=naics`}>
                                        <Glossary alt="View glossary definition of NAICS" />
                                    </a>
                                </span>
                            </div>
                            {!isIdv && <LineTree type="naics" data={naics} />}
                            {isIdv && naics}
                        </div>
                        <div className="naics-psc__section naics-psc__section_psc">
                            <div className="naics-psc__heading">
                                <div className="naics-psc__icon">
                                    Product or Service Code (PSC)
                                    <span className="naics-psc__icon">
                                        <a href={`#/award/${awardId}/?glossary=productservice-code-psc`}>
                                            <Glossary alt="View glossary definition of Product/Service Code (PSC)" />
                                        </a>
                                    </span>
                                </div>
                                {!isIdv && <LineTree type="psc" data={psc} />}
                                {isIdv && psc}
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
