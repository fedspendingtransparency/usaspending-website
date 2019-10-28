/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { SpeechBubble, Glossary } from 'components/sharedComponents/icons/Icons';
import { descriptionInfo } from '../../shared/InfoTooltipContent';
import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import ExpandableAwardSection from '../ExpandableAwardSection';
import LineTree from './LineTree';

const propTypes = {
    awardId: PropTypes.string,
    description: PropTypes.string,
    naics: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // string for IDVs
    psc: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // string for IDVs
    isIdv: PropTypes.bool
};

const AwardDescription = ({
    awardId,
    description,
    naics = null,
    psc = null,
    isIdv = false
}) => (
    <AwardSection type="column" className="award-viz award-description">
        <AwardSectionHeader icon={<SpeechBubble />} tooltip={descriptionInfo} title="Description" />
        <div className="award-description__content">
            <ExpandableAwardSection contentClassName="award-description__description" type="secondary" content={description} />
            {naics && psc && (
                <div className="award-description__naics-psc">
                    <div className="naics-psc__section">
                        <div className="naics-psc__heading">
                            North American Industry Classification System (NAICS) Code
                            <div className="naics-psc__icon">
                                <a href={`#/award/${awardId}/?glossary=naics`}>
                                    <Glossary />
                                </a>
                            </div>
                        </div>
                        {!isIdv && <LineTree type="naics" data={naics} />}
                        {isIdv && naics}
                    </div>
                    <div className="naics-psc__section naics-psc__section_psc">
                        <div className="naics-psc__heading">
                            Product Service Code (PSC)
                            <div className="naics-psc__icon">
                                <a href={`#/award/${awardId}/?glossary=productservice-code-psc`}>
                                    <Glossary />
                                </a>
                            </div>
                        </div>
                        {!isIdv && <LineTree type="psc" data={psc} />}
                        {isIdv && psc}
                    </div>
                </div>
            )}
        </div>
    </AwardSection>
);

AwardDescription.propTypes = propTypes;
export default AwardDescription;
