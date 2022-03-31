/**
 * GettingStarted.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import ImageCarousel from '../../homepage/features/ImageCarousel';

const searchImages = [
    {
        srcSet: 'img/homepage-award-search.webp 1x, img/homepage-award-search@2x.webp 2x',
        src: 'img/homepage-award-search.png',
        alt: 'Screenshot of the Award Search page, showing a map data visualization'
    },
    {
        srcSet: 'img/homepage-keyword-search.webp 1x, img/homepage-keyword-search@2x.webp 2x',
        src: 'img/homepage-keyword-search.png',
        alt: 'Screenshot of the Keyword Search page'
    }
];

const profileImages = [
    {
        srcSet: 'img/homepage-profiles/img:homepage-profile-agency@1-5x.webp 1x',
        src: 'img/homepage-profiles/img:homepage-profile-agency@1-5x.png',
        alt: 'Screenshot of the Agency Profile page'
    },
    {
        srcSet: 'img/homepage-profile-fedaccount.webp 1x, img/homepage-profile-fedaccount@2x.webp 2x',
        src: 'img/homepage-profile-fedaccount.png',
        alt: 'Screenshot of the Federal Account Profile page'
    },
    {
        srcSet: 'img/homepage-profile-state.webp 1x, img/homepage-profile-state@2x.webp 2x',
        src: 'img/homepage-profile-state.png',
        alt: 'Screenshot of State Profile page'
    },
    {
        srcSet: 'img/homepage-profile-recipient.webp 1x, img/homepage-profile-recipient@2x.webp 2x',
        src: 'img/homepage-profile-recipient.png',
        alt: 'Recipient Profile page coming soon'
    }
];

const GettingStarted = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const searchCarouselLayout = isMobile ?
        <>
            <FlexGridCol className="homepage-search-feature" width={12} desktop={6}>
                <div className="homepage-search-feature-desc">
                    <h2 className="homepage-search-feature-desc__title">A targeted approach to finding federal award data</h2>
                </div>
                <div className="homepage-search-feature__img-carousel">
                    <ImageCarousel
                        images={searchImages}
                        label="Image carousel of Award Search screenshots " />
                </div>
            </FlexGridCol>
            <FlexGridCol className="homepage-search-feature" width={12} desktop={6}>
                <div className="homepage-search-feature-desc">
                    <p>
                        Whether you&apos;re a congressional staffer, government employee, researcher, or data buff, our <strong>Award Search</strong> will help you answer your toughest questions about federal spending.
                    </p>
                    <p>
                        Use <strong>Keyword Search</strong> for a broad view of award data, but if you want to dig deeper, our <strong>Advanced Search</strong> offers filters that let you customize your data sets. Interactive visualizations — including a spending map — complement downloadable files.
                    </p>
                    <button>Select Search Type</button>
                </div>
            </FlexGridCol>
        </>
        :
        <>
            <FlexGridCol className="homepage-search-feature" width={12} desktop={6}>
                <div className="homepage-search-feature__background-flair" />
                <div className="homepage-search-feature-desc">
                    <h2 className="homepage-search-feature-desc__title">A targeted approach to finding federal award data</h2>
                    <p>
                        Whether you&apos;re a congressional staffer, government employee, researcher, or data buff, our <strong>Award Search</strong> will help you answer your toughest questions about federal spending.
                    </p>
                    <p>
                        Use <strong>Keyword Search</strong> for a broad view of award data, but if you want to dig deeper, our <strong>Advanced Search</strong> offers filters that let you customize your data sets. Interactive visualizations — including a spending map — complement downloadable files.
                    </p>
                    <button>Select Search Type</button>
                </div>
            </FlexGridCol>
            <FlexGridCol className="homepage-search-feature" width={12} desktop={6}>
                <div className="homepage-search-feature__img-carousel">
                    <ImageCarousel
                        images={searchImages}
                        label="Image carousel of Award Search screenshots " />
                </div>
            </FlexGridCol>
        </>;

    const profileCarouselLayout = isMobile ?
    <>
        <FlexGridCol className="homepage-profile-feature" width={12} desktop={6}>
            <div className="homepage-profile-feature-desc">
                <h5 className="homepage-profile-feature-desc__title">A snapshot of federal spending</h5>
            </div>
            <div className="homepage-profile-feature__img-carousel">
                <ImageCarousel
                    images={profileImages} />
            </div>
        </FlexGridCol>
        <FlexGridCol className="homepage-profile-feature" width={12} desktop={6}>
            <div className="homepage-profile-feature-desc">
                <p>
                    Interested in how specific agencies spend their funding? Or how federal funding is being spent in your state? Our <strong>Profiles</strong> make it easier to understand questions like these and more with interactive charts and tables that offer a snapshot of spending by agency, state, recipient, and the federal accounts that agencies use to spend their funding. Use our COVID-19 Spending profile to learn how federal funding is being spent in response to the pandemic.
                </p>
                <button>Browse Profiles</button>
            </div>
        </FlexGridCol>
    </>
        :
    <>
        <FlexGridCol className="homepage-profile-feature" width={12} desktop={6}>
            <div className="homepage-profile-feature__img-carousel">
                <ImageCarousel
                    images={profileImages} />
            </div>
        </FlexGridCol>
        <FlexGridCol className="homepage-profile-feature" width={12} desktop={6}>
            <div className="homepage-profile-feature-desc">
                <h5 className="homepage-profile-feature-desc__title">A snapshot of federal spending</h5>
                <p>
                    Interested in how specific agencies spend their funding? Or how federal funding is being spent in your state? Our <strong>Profiles</strong> make it easier to understand questions like these and more with interactive charts and tables that offer a snapshot of spending by agency, state, recipient, and the federal accounts that agencies use to spend their funding. Use our COVID-19 Spending profile to learn how federal funding is being spent in response to the pandemic.
                </p>
                <button>Browse Profiles</button>
            </div>
        </FlexGridCol>
    </>;

    const spendingExplorerLayout = isMobile ?
    <>
        <FlexGridCol className="homepage-spending-explorer" width={12} desktop={6}>
            <div className="homepage-spending-explorer-desc">
                <h5 className="homepage-spending-explorer-desc__title">A big-picture view of government spending</h5>
            </div>
            <div className="homepage-spending-explorer__img-wrapper">
                <picture className="homepage-spending-explorer__img">
                    <source srcSet="img/homepage-spending-explorer/homepage-spending-explorer@1-5x.webp" type="image/webp" />
                    <source srcSet="img/homepage-spending-explorer/homepage-spending-explorer@1-5x.png" type="image/png" />
                    <img src="img/homepage-spending-explorer/homepage-spending-explorer@1-5x.png" alt="Screenshot of the Spending Explorer" />
                </picture>
            </div>
        </FlexGridCol>
        <FlexGridCol className="homepage-spending-explorer" width={12} desktop={6}>
            <div className="homepage-spending-explorer-desc">
                <p>
                    The <strong>Spending Explorer</strong> lets you explore the entire federal budget in increasing detail, making it easier to understand how funding flows from Congress to federal agencies and how those agencies spend that funding. Interactive charts and tables help break down the budget in multiple ways to clarify the relationships between federal spending components.
                </p>
                <button>Try Spending Explorer</button>
            </div>
        </FlexGridCol>
    </>
        :
    <>
        <FlexGridCol className="homepage-spending-explorer" width={12} desktop={6}>
            <div className="homepage-spending-explorer__img-wrapper">
                <picture className="homepage-spending-explorer__img">
                    <source srcSet="img/homepage-spending-explorer/homepage-spending-explorer@1-5x.webp" type="image/webp" />
                    <source srcSet="img/homepage-spending-explorer/homepage-spending-explorer@1-5x.png" type="image/png" />
                    <img src="img/homepage-spending-explorer/homepage-spending-explorer@1-5x.png" alt="Screenshot of the Spending Explorer" />
                </picture>
            </div>
        </FlexGridCol>
        <FlexGridCol className="homepage-spending-explorer" width={12} desktop={6}>
            <div className="homepage-spending-explorer-desc">
                <h5 className="homepage-spending-explorer-desc__title">A big-picture view of government spending</h5>
                <p>
                    The <strong>Spending Explorer</strong> lets you explore the entire federal budget in increasing detail, making it easier to understand how funding flows from Congress to federal agencies and how those agencies spend that funding. Interactive charts and tables help break down the budget in multiple ways to clarify the relationships between federal spending components.
                </p>
                <button>Try Spending Explorer</button>
            </div>
        </FlexGridCol>
    </>;

    return (
        <section
            className="homepage-getting-started"
            aria-label="Getting Started sections">
            <FlexGridRow
                className="grid-content">
                <div className="section-heading-title-wrapper">
                    <h1 className="section-heading-title">Getting Started on USAspending</h1>
                </div>
                {spendingExplorerLayout}
                {searchCarouselLayout}
                {profileCarouselLayout}
            </FlexGridRow>
        </section>
    );
};

export default GettingStarted;
