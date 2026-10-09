/**
 * NLSearchInfoSection.jsx
 * Created by Trey Morgan 09/28/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol } from 'data-transparency-ui';
import Accordion from '../../sharedComponents/accordion/Accordion';

require("pages/search/naturalLanguage/searchInfoPage.scss");

const propTypes = {
    section: PropTypes.object
};

const NLSearchInfoSection = ({ section }) => {
    return (
        <div className="search-info-page-section">
            <div className="search-info-page__heading-section">
                <FlexGridCol
                    className="search-info-page__content-col"
                    desktop={{ span: 9, offset: 3 }}
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
                    desktop={{ span: 9, offset: 3 }}
                    tablet={12}
                    mobile={12}>
                    {section.items.map((item, i) => (
                        <Accordion
                            containerClassName="search-info-page-container"
                            headingClassName="search-info-page-heading"
                            contentClassName="search-info-page-content"
                            faClassName="search-info-page-fa"
                            aria-label="Toggle Expansion"
                            aria-expanded="false"
                            // eslint-disable-next-line react/no-array-index-key
                            key={`item-${i}`}
                            title={item.title}>
                            {item.content}
                        </Accordion>
                    ))}
                </FlexGridCol>
            </div>
        </div>
    );
};

NLSearchInfoSection.propTypes = propTypes;
export default NLSearchInfoSection;
