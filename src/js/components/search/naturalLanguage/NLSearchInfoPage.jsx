/**
 * NLSearchInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React, { useState, useCallback, useMemo } from 'react';
import PageWrapper from '../../sharedComponents/PageWrapper';
import SideBarNav from '../../sharedComponents/SideBarNav';
import BannerPageHeader from '../../sharedComponents/header/BannerPageHeader';
import { smartAssistPageMetaTags } from '../../../helpers/metaTagHelper';
import smartAssistGraphic from '../../../../img/smart-assist-graphic.png';
import { smartAssistContent } from '../naturalLanguage/NLData';
import NLSearchInfoSection from './NLSearchInfoSection';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import NLSearchInfoResources from './NLSearchInfoResources';
// import NLSearchInfoSidebar from './NLSearchInfoSidebar';
import useJumpToSection from '../../../hooks/useJumpToSection';
import useQueryParams from '../../../hooks/useQueryParams';
import { FlexGridCol, Button } from 'data-transparency-ui';
import ShareDownloadButtonGroup from '../../sharedComponents/buttons/ShareDownloadButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Index } from 'flexsearch';
import * as Icons from 'components/sharedComponents/icons/Icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, A11y, FreeMode } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';

require('pages/search/naturalLanguage/searchInfoPage.scss');

const graphicLabel = (
    <>
        An <span style={{ color: '#0081a1', fontWeight: 600 }}>easy</span> way to search for government spending.
    </>
);

const infoSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'searching-with-smart-assist',
        label: 'Searching With Smart Assist'
    },
    {
        section: 'understanding-results',
        label: 'Understanding Results'
    },
    {
        section: 'limitations',
        label: 'Limitations'
    },
    {
        section: 'feedback-and-support',
        label: 'Feedback & Support'
    }
];

const { overview, search, results, limitations, feedback } = smartAssistContent ?? {};

const extractTextFromNode = (node) => {
    if (node === null || node === undefined || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return `${node}`;
    if (Array.isArray(node)) return node.map(extractTextFromNode).join(' ');
    if (node.props?.children) return extractTextFromNode(node.props.children);
    return '';
};

const NLSearchInfoPage = () => {
    const jumpToSection = useJumpToSection('#nlinfo-', infoSections, false, stickyHeaderHeight);
    const query = useQueryParams();
    const [activeSection] = useState(query.section || 'overview');
    const [toggleAllAccordions, setToggleAllAccordions] = useState({ trigger: 0, expand: false });
    const [openAccordions, setOpenAccordions] = useState({});
    const [text, setText] = useState('');
    const [highlightTerm, setHighlightTerm] = useState('');
    const accordionIds = Object.keys(openAccordions);
    const allExpanded = accordionIds.length > 0 && accordionIds.every((accordionId) => openAccordions[accordionId]);

    const { searchIndex, searchDocsById } = useMemo(() => {
        const index = new Index({ tokenize: 'forward' });
        const docsById = {};

        Object.entries(smartAssistContent ?? {}).forEach(([sectionKey, section]) => {
            section.items.forEach((item, itemIndex) => {
                const accordionId = `${sectionKey}-${itemIndex}`;
                index.add(accordionId, `${item.title} ${extractTextFromNode(item.content)}`);
                docsById[accordionId] = { accordionId };
            });
        });

        return { searchIndex: index, searchDocsById: docsById };
    }, []);

    const handleAccordionToggle = useCallback((id, isOpen) => {
        setOpenAccordions((prev) => (prev[id] === isOpen ? prev : { ...prev, [id]: isOpen }));
    }, []);

    const handleToggleAll = () => {
        setToggleAllAccordions((prev) => ({ trigger: prev.trigger + 1, expand: !allExpanded }));
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleClear = () => {
        setText('');
        setHighlightTerm('');
        setToggleAllAccordions((prev) => (prev.targetIds ?
            { trigger: prev.trigger + 1, expand: true, targetIds: prev.targetIds } :
            prev));
    };

    const handleKey = (e) => {
        if (e.key !== 'Enter') return;

        const searchQuery = text.trim();
        if (!searchQuery) return;

        const matchIds = searchIndex.search(searchQuery, { limit: 1000 });
        const matches = matchIds.map((matchId) => searchDocsById[matchId]).filter(Boolean);
        if (!matches.length) return;

        setHighlightTerm(searchQuery);
        setToggleAllAccordions((prev) => ({
            trigger: prev.trigger + 1,
            expand: true,
            targetIds: matches.map((match) => match.accordionId)
        }));

        requestAnimationFrame(() => {
            document.getElementById(matches[0].accordionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    };

    return (
        <PageWrapper
            pageName="smart-assist"
            classNames="usa-smart-assist-page"
            metaTagProps={smartAssistPageMetaTags}
            title="Smart Assist">
            <main id="main-content" className="main-content">
                <BannerPageHeader
                    className="nl-search-container"
                    kicker="RESOURCES"
                    title="Smart Assist"
                    body="Get quick answers to your questions about our AI-powered Smart Assist feature"
                    faIcon="sparkles"
                    primaryColor="#0081a1"
                    secondaryColor="#0081a1"
                    overrideBackgroundColor="linear-gradient(91deg,#00687d 0%, #0081a1 35%, #005ea2 100%)" />
                <FlexGridCol className="search-info-page__download-group">
                    <ShareDownloadButtonGroup
                        url=""
                        showDownloadBtn
                        onDownloadClick={() => {}}
                        downloadInFlight={false}
                        downloadIcon="file-download"
                        onShareClick={() => {}}
                        keepShareText
                        className="blue-share" />
                </FlexGridCol>
                <section className="search-info-page__heading">
                    <div className="search-info-page__label">{graphicLabel}</div>
                    <div className="search-info-page__graphic-container">
                        <Swiper
                            slidesPerView="auto"
                            freeMode={{ enabled: true, momentum: false }}
                            keyboard
                            a11y
                            grabCursor
                            modules={[Keyboard, A11y, FreeMode]}
                            className="search-info-page__graphic-swiper">
                            <SwiperSlide className="search-info-page__graphic-slide">
                                <img
                                    src={smartAssistGraphic}
                                    alt="Smart Assist graphic" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                <section className="search-info-page__content-section">
                    <SideBarNav
                        sections={infoSections}
                        activeSection={activeSection}
                        pageName="nlinfo"
                        detectActiveSection
                        jumpToSection={jumpToSection} />
                    <FlexGridCol className="search-info-page__expand-all-btn" desktop={9}>
                        <div className="search-info-page__top-content-row">
                            <div className="search-info-page__input">
                                <div className="search-icon"><FontAwesomeIcon icon="search" /></div>
                                <input
                                    className="search-info-page__textbox"
                                    name="search-info-page__textbox"
                                    type="text"
                                    placeholder="Search USAspending Smart Assist"
                                    value={text}
                                    onChange={handleChange}
                                    onKeyUp={handleKey} />
                                {text.length > 0 && (
                                    <button
                                        className="clear-button"
                                        id="nl-clear-button"
                                        aria-label="Clear Input"
                                        title="Clear Input"
                                        onClick={handleClear}>
                                        <Icons.Close alt="Clear search input" />
                                    </button>
                                )}
                            </div>
                            <Button
                                copy={allExpanded ? 'Collapse all' : 'Expand all'}
                                onClick={handleToggleAll}
                                buttonTitle={allExpanded ? 'Collapse all' : 'Expand all'}
                                buttonSize="md"
                                buttonType="text"
                                backgroundColor="light"
                                textAlignment="center"
                                imageAlignment="left"
                                image={(
                                    <div className="button-icon-container">
                                        <FontAwesomeIcon
                                            className="button-icon"
                                            icon={allExpanded ? 'minus' : 'plus'} />
                                    </div>
                                )} />
                        </div>
                        <NLSearchInfoSection
                            anchor="nlinfo-overview"
                            section={overview}
                            sectionKey="overview"
                            toggleAll={toggleAllAccordions}
                            onToggle={handleAccordionToggle}
                            highlightTerm={highlightTerm} />
                        <NLSearchInfoSection
                            anchor="nlinfo-searching-with-smart-assist"
                            section={search}
                            sectionKey="search"
                            toggleAll={toggleAllAccordions}
                            onToggle={handleAccordionToggle}
                            highlightTerm={highlightTerm} />
                        <NLSearchInfoSection
                            anchor="nlinfo-understanding-results"
                            section={results}
                            sectionKey="results"
                            toggleAll={toggleAllAccordions}
                            onToggle={handleAccordionToggle}
                            highlightTerm={highlightTerm} />
                        <NLSearchInfoSection
                            anchor="nlinfo-limitations"
                            section={limitations}
                            sectionKey="limitations"
                            toggleAll={toggleAllAccordions}
                            onToggle={handleAccordionToggle}
                            highlightTerm={highlightTerm} />
                        <NLSearchInfoSection
                            anchor="nlinfo-feedback-and-support"
                            section={feedback}
                            sectionKey="feedback"
                            toggleAll={toggleAllAccordions}
                            onToggle={handleAccordionToggle}
                            highlightTerm={highlightTerm} />
                    </FlexGridCol>
                </section>
                <NLSearchInfoResources />
            </main>
        </PageWrapper>
    );
};

export default NLSearchInfoPage;
