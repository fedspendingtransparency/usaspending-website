/**
 * GettingStarted.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';

const GettingStarted = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const carouselLayout = isMobile ?
        <>
            <FlexGridCol className="homepage-search-feature" width={9} tablet={6}>
                <div class="homepage-search-feature__img-wrapper">
                    Search feature carousel
                </div>
            </FlexGridCol>
            <FlexGridCol className="homepage-search-feature" width={9} tablet={6}>
                <div className="homepage-search-feature__background-flair" />
                    <div class="homepage-search-feature-desc">
                        <h5>A targeted approach to finding federal award data</h5>
                        <p>
                            Whether you're a congressional staffer, government employee, researcher, or data buff, our Award Search will help you answer your toughest questions about federal spending.
                        </p>
                        <p>
                            Use Keyword Search for a broad view of award data, but if you want to dig deeper, our Advanced Search offers filters that let you customize your data sets. Interactive visualizations — including a spending map — complement downloadable files. 
                        </p>
                        <button>Select Search Type</button>
                    </div>
            </FlexGridCol>
        </>
        :
        <>
            <FlexGridCol className="homepage-search-feature" width={9} tablet={6}>
                <div className="homepage-search-feature__background-flair" />
                    <div class="homepage-search-feature-desc">
                        <h5>A targeted approach to finding federal award data</h5>
                        <p>
                            Whether you're a congressional staffer, government employee, researcher, or data buff, our Award Search will help you answer your toughest questions about federal spending.
                        </p>
                        <p>
                            Use Keyword Search for a broad view of award data, but if you want to dig deeper, our Advanced Search offers filters that let you customize your data sets. Interactive visualizations — including a spending map — complement downloadable files. 
                        </p>
                        <button>Select Search Type</button>
                    </div>
            </FlexGridCol>
            <FlexGridCol className="homepage-search-feature" width={9} tablet={6}>
                <div class="homepage-search-feature__img-wrapper">
                    Search feature carousel
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
                <h3 className="section-heading-title">Getting Started on USAspending</h3>
            </div>
            <FlexGridCol className="homepage-spending-explorer" width={9} tablet={6}>
                <div class="homepage-spending-explorer__img-wrapper">
                    Spending explorer feature image
                </div>
            </FlexGridCol>
            <FlexGridCol className="homepage-spending-explorer" width={9} tablet={6}>
                <div class="homepage-spending-explorer-desc">
                    <h5>A big-picture view of government spending</h5>
                    <p>
                        The Spending Explorer lets you explore the entire federal budget in increasing detail, making it easier to understand how funding flows from Congress to federal agencies and how those agencies spend that funding. Interactive charts and tables help break down the budget in multiple ways to clarify the relationships between federal spending components. 
                    </p>
                    <button>Try Spending Explorer</button>
                </div>
            </FlexGridCol>
            {carouselLayout}
            <FlexGridCol className="homepage-search-feature" width={9} tablet={6}>
                <div class="homepage-search-feature__img-wrapper">
                    Profiles feature carousel
                </div>
            </FlexGridCol>
            <FlexGridCol className="homepage-search-feature" width={9} tablet={6}>
                <div class="homepage-search-feature-desc">
                    <h5>A snapshot of federal spending</h5>
                    <p>
                        Interested in how specific agencies spend their funding? Or how federal funding is being spent in your state? Our Profiles make it easier to understand questions like these and more with interactive charts and tables that offer a snapshot of spending by agency, state, recipient, and the federal accounts that agencies use to spend their funding. Use our COVID-19 Spending profile to learn how federal funding is being spent in response to the pandemic.
                    </p>
                    <button>Browse Profiles</button>
                </div>
            </FlexGridCol>
        </FlexGridRow>
    </section>
    )
};

export default GettingStarted;
