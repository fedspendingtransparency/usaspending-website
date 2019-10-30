/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SpeechBubble, Glossary } from 'components/sharedComponents/icons/Icons';
import { descriptionInfo } from '../../shared/InfoTooltipContent';
import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import AwardSectionExpandButton from '../AwardSectionExpandButton';
import LineTree from './LineTree';

const propTypes = {
    awardId: PropTypes.string,
    description: PropTypes.string,
    naics: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // string for IDVs
    psc: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // string for IDVs
    isIdv: PropTypes.bool
};

const maxChars = 300;

const AwardDescription = ({
    awardId,
    description,
    naics = null,
    psc = null,
    isIdv = false
}) => {
    const [isExpanded, setExpanded] = useState(false);
    let value = description;
    const overflow = value.length > maxChars;
    if (overflow && !isExpanded) {
        value = `${value.substring(0, maxChars)}...`;
    }

    let button = null;
    if (overflow) {
        button = <AwardSectionExpandButton type="secondary" isExpanded={isExpanded} setExpanded={setExpanded} />;
    }

    return (
        <AwardSection type="column" className="award-viz award-description">
            <AwardSectionHeader icon={<SpeechBubble />} tooltip={descriptionInfo} title="Description" />
            <div className="award-description__content">
                <p className="award-description__description">
                    {value} {button}
                </p>
                {naics && psc && (
                    <div className="award-description__naics-psc">
                        <div className="naics-psc__section">
                            <div className="naics-psc__heading">
                                North American Industry Classification System (NAICS) Code
                                <span className="naics-psc__icon">
                                    <a href={`#/award/${awardId}/?glossary=naics`}>
                                        <Glossary />
                                    </a>
                                </span>
                            </div>
                            {!isIdv && <LineTree type="naics" data={naics} />}
                            {isIdv && naics}
                        </div>
                        <div className="naics-psc__section naics-psc__section_psc">
                            <div className="naics-psc__heading">
                                Product Service Code (PSC)
                                <span className="naics-psc__icon">
                                    <a href={`#/award/${awardId}/?glossary=productservice-code-psc`}>
                                        <Glossary />
                                    </a>
                                </span>
                            </div>
                            {!isIdv && <LineTree type="psc" data={psc} />}
                            {isIdv && psc}
                        </div>
                    </div>
                )}
            </div>
        </AwardSection>
    );
};

AwardDescription.propTypes = propTypes;
export default AwardDescription;
