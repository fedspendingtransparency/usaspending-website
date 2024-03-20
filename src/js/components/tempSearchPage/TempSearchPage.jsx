import React, { useEffect, useState } from "react";
import PageWrapper from "../sharedComponents/PageWrapper";
import PageFeatureFlag from "../sharedComponents/PageFeatureFlag";
import TempAwardTable from "./TempAwardTable";
import TempSpendingOverTime from "./TempSpendingOverTime";
import TempMapSection from "./TempMapSection";
import TempCategoriesSection from "./TempCategoriesSection";
import TempPlaceholderComponent from "./TempPlaceholderComponent";
import TempSearchSectionWrapper from "./TempSearchSectionWrapper";

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [viewType, setViewType] = useState('chart');

    const observerOptions = {
        threshold: 0.1
    };

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.className;

            if (entry.isIntersecting) {
                setIsVisible(section);
                if (section === 'award') {
                    setAwardTableHasLoaded(true);
                }
                else if (section === 'spending') {
                    setSpendingHasLoaded(true);
                }
                else if (section === 'map') {
                    setMapHasLoaded(true);
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
                }
            }
        });
    };

    const dummyWrapperProps = {
        sectionTitle: 'Section Title',
        dropdownOptions: [
            {
                name: 'Option 0',
                value: 0
            },
            {
                name: 'Option 1',
                value: 1
            },
            {
                name: 'Option 2',
                value: 2
            }
        ],
        selectedDropdownOption: 0,
        isVisualization: true,
        children: 'children',
        dsmContent: 'dsmContent'
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);

        if (observerSupported) {
            const target = '#search-page-component';
            const targets = document.querySelectorAll(target);

            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(callbackFunction, observerOptions);

            targets.forEach((i) => {
                if (i.className) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerSupported]);

    return (
        <PageFeatureFlag>
            <PageWrapper
                pageName="Temp Search Page"
                classNames="usa-da-search-page"
                title="Temp Search Page">
                <main id="main-content" className="main-content">
                    <TempSearchSectionWrapper
                        {...dummyWrapperProps}
                        viewType={viewType}
                        setViewType={setViewType} />
                    <div id="search-page-component" className="award">
                        {!awardTableHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'award' || awardTableHasLoaded) &&
                            <TempAwardTable />
                        }
                    </div>

                    <div id="search-page-component" className="spending">
                        {!spendingHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'spending' || spendingHasLoaded) &&
                            <TempSpendingOverTime />
                        }
                    </div>

                    <div id="search-page-component" className="map">
                        {!mapHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'map' || mapHasLoaded) &&
                            <TempMapSection />
                        }
                    </div>

                    <div id="search-page-component" className="categories">
                        {!categoriesHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'categories' || categoriesHasLoaded) &&
                            <TempCategoriesSection />
                        }
                    </div>
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
