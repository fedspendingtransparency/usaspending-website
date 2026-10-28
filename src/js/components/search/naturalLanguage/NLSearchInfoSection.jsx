/**
 * NLSearchInfoSection.jsx
 * Created by Trey Morgan 09/28/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol } from 'data-transparency-ui';
import Accordion from '../../sharedComponents/accordion/Accordion';

require('pages/search/naturalLanguage/searchInfoPage.scss');

const propTypes = {
    anchor: PropTypes.string,
    section: PropTypes.object,
    openAccordions: PropTypes.objectOf(PropTypes.bool),
    sectionKey: PropTypes.string,
    onToggle: PropTypes.func
};

const NLSearchInfoSection = ({ anchor, section, openAccordions, sectionKey, onToggle }) => {
    return (
        <div className="search-info-page-section" key={anchor} id={anchor}>
            <div className="search-info-page__heading-section">
                <FlexGridCol
                    className="search-info-page__content-col"
                    desktop={{ span: 11, offset: 1 }}
                    tablet={12}
                    mobile={12}>
                    <h3 className="search-info-page__top-content-heading">
                        {section.heading}
                    </h3>
                </FlexGridCol>
            </div>
            <div className="search-info-page__accordion-section">
                <FlexGridCol
                    className="search-info-page__accordion-list"
                    desktop={{ span: 11, offset: 1 }}
                    tablet={12}
                    mobile={12}>
                    {section.items.map((item, i) => {
                        const accordionId = `${sectionKey}-${i}`;
                        return (
                            <Accordion
                                title={item.title}
                                open={!!openAccordions[accordionId]}
                                setOpen={(updater) => onToggle(accordionId, updater)}
                                key={`item-${item.title}`}>
                                {item.content}
                            </Accordion>
                        );
                    })}
                </FlexGridCol>
            </div>
        </div>
    );
};

NLSearchInfoSection.propTypes = propTypes;
export default NLSearchInfoSection;
