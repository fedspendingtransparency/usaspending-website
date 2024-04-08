import React, { useEffect, useState } from "react";
import PageFeatureFlag from "../../sharedComponents/PageFeatureFlag";
import AwardTable from "./AwardTable";
import SpendingOverTime from "./SpendingOverTime";
import MapSection from "./MapSection";
import CategoriesSection from "./CategoriesSection";
import { TempPlaceholderComponent, TempPlaceholderChart, TempPlaceholderTable, TempPlaceholderDsmContent } from "./TempPlaceholderComponents";
import SearchSectionWrapper from "./SearchSectionWrapper";

require("pages/search/searchPage.scss");

const ResultsView = () => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [viewType, setViewType] = useState('chart');
    const [selectedDropdown, setSelectedDropdown] = useState('0');

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

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const dummyWrapperProps = {
        sectionTitle: 'Results by Category',
        dropdownOptions: [
            {
                name: 'Awarding Agency',
                value: '0',
                onClick
            },
            {
                name: 'Awarding Subagency',
                value: '1',
                onClick
            },
            {
                name: 'Recipient',
                value: '2',
                onClick
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: '3',
                onClick
            },
            {
                name: 'Product and Service Code (PSC)',
                value: '4',
                onClick
            },
            {
                name: 'Assistance Listing',
                value: '5',
                onClick
            }
        ],
        selectedDropdownOption: selectedDropdown,
        isVisualization: true,
        chart: <TempPlaceholderChart />,
        table: <TempPlaceholderTable />,
        dsmContent: <TempPlaceholderDsmContent />
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
            <main id="main-content" className="main-content">
                <SearchSectionWrapper
                    {...dummyWrapperProps}
                    viewType={viewType}
                    setViewType={setViewType}>
                    <div id="search-page-component" className="award">
                        {!awardTableHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'award' || awardTableHasLoaded) &&
                                <AwardTable />
                        }
                    </div>
                </SearchSectionWrapper>

                <div id="search-page-component" className="spending">
                    {!spendingHasLoaded && <TempPlaceholderComponent />}
                    {(isVisible === 'spending' || spendingHasLoaded) &&
                            <SpendingOverTime />
                    }
                </div>

                <div id="search-page-component" className="map">
                    {!mapHasLoaded && <TempPlaceholderComponent />}
                    {(isVisible === 'map' || mapHasLoaded) &&
                            <MapSection />
                    }
                </div>

                <div id="search-page-component" className="categories">
                    {!categoriesHasLoaded && <TempPlaceholderComponent />}
                    {(isVisible === 'categories' || categoriesHasLoaded) &&
                            <CategoriesSection />
                    }
                </div>
            </main>
        </PageFeatureFlag>
    );
};

export default ResultsView;
