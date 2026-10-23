/**
 * NLSearchInfoSection.jsx
 * Created by Trey Morgan 09/28/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol } from 'data-transparency-ui';
import Accordion from '../../sharedComponents/accordion/Accordion';

require("pages/search/naturalLanguage/searchInfoPage.scss");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text, term, keyPrefix) => {
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    const parts = text.split(regex);
    if (parts.length === 1) return text;

    return parts.map((part, i) => (
        i % 2 === 1 ?
            // eslint-disable-next-line react/no-array-index-key
            <mark key={`${keyPrefix}-${i}`} className="search-info-page__search-highlight">{part}</mark> :
            part
    ));
};

const highlightNode = (node, term, keyPrefix = 'highlight') => {
    if (!term) return node;
    if (node === null || node === undefined || typeof node === 'boolean' || typeof node === 'number') return node;
    if (typeof node === 'string') return highlightText(node, term, keyPrefix);
    if (Array.isArray(node)) return node.map((child, i) => highlightNode(child, term, `${keyPrefix}-${i}`));
    if (node.props?.children !== undefined) {
        return React.cloneElement(
            node,
            { key: node.key ?? keyPrefix },
            highlightNode(node.props.children, term, keyPrefix)
        );
    }
    return node;
};

const propTypes = {
    anchor: PropTypes.string,
    section: PropTypes.object,
    toggleAll: PropTypes.shape({
        trigger: PropTypes.number,
        expand: PropTypes.bool,
        targetIds: PropTypes.arrayOf(PropTypes.string)
    }),
    sectionKey: PropTypes.string,
    onToggle: PropTypes.func,
    highlightTerm: PropTypes.string
};

const NLSearchInfoSection = ({ anchor, section, toggleAll, sectionKey, onToggle, highlightTerm = '' }) => {
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
                            accordionId={`${sectionKey}-${i}`}
                            title={highlightNode(item.title, highlightTerm, `${sectionKey}-${i}-title`)}
                            toggleAll={toggleAll}
                            onToggle={onToggle}>
                            {highlightNode(item.content, highlightTerm, `${sectionKey}-${i}-content`)}
                        </Accordion>
                    ))}
                </FlexGridCol>
            </div>
        </div>
    );
};

NLSearchInfoSection.propTypes = propTypes;
export default NLSearchInfoSection;
